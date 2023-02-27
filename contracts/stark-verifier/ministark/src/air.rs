use crate::challenges::Challenges;
use crate::composer::DeepCompositionCoeffs;
use crate::constraints::AlgebraicExpression;
use crate::hints::Hints;
use crate::random::PublicCoin;
use crate::utils;
use crate::ProofOptions;
use crate::StarkExtensionOf;
use crate::TraceInfo;
use alloc::collections::BTreeSet;
use alloc::vec::Vec;
use ark_ff::FftField;
use ark_ff::UniformRand;
use ark_poly::EvaluationDomain;
use ark_poly::Radix2EvaluationDomain;
use ark_serialize::CanonicalDeserialize;
use ark_serialize::CanonicalSerialize;
use digest::Digest;
use gpu_poly::GpuFftField;
#[cfg(feature = "parallel")]
use rayon::prelude::*;

pub trait Air {
    type Fp: GpuFftField<FftField = Self::Fp> + FftField;
    type Fq: StarkExtensionOf<Self::Fp>;
    // TODO: consider removing clone requirement
    type PublicInputs: CanonicalSerialize + CanonicalDeserialize + Clone;

    // TODO: could make this borrow info and options if so inclined
    fn new(info: TraceInfo, inputs: Self::PublicInputs, options: ProofOptions) -> Self;

    fn pub_inputs(&self) -> &Self::PublicInputs;

    fn trace_info(&self) -> &TraceInfo;

    fn options(&self) -> &ProofOptions;

    fn domain_offset(&self) -> Self::Fp {
        Self::Fp::GENERATOR
    }

    fn trace_len(&self) -> usize {
        let len = self.trace_info().trace_len;
        assert!(len.is_power_of_two());
        len
    }

    /// Constraint evaluation blowup factor
    /// Must be a power of two.
    fn ce_blowup_factor(&self) -> usize {
        let trace_degree = self.trace_len() - 1;
        let ret = utils::ceil_power_of_two(
            self.constraints()
                .iter()
                .map(|constraint| {
                    let (numerator_degree, denominator_degree) = constraint.degree(trace_degree);
                    numerator_degree - denominator_degree
                })
                .max()
                // TODO: ceil_power_of_two might not be correct here. check the math
                .map_or(0, |degree| utils::ceil_power_of_two(degree) / trace_degree),
        );
        ret
    }

    /// Returns a degree that all constraints polynomials must be normalized to.
    fn composition_degree(&self) -> usize {
        let trace_len = self.trace_len();
        let ce_domain_size = trace_len * self.ce_blowup_factor();
        ce_domain_size - 1
    }

    fn lde_blowup_factor(&self) -> usize {
        self.options().lde_blowup_factor as usize
    }

    /// Validate properties of this air
    fn validate(&self) {
        let ce_blowup_factor = self.ce_blowup_factor();
        let lde_blowup_factor = self.lde_blowup_factor();
        assert!(
            ce_blowup_factor <= lde_blowup_factor,
            "constraint evaluation blowup factor {ce_blowup_factor} is 
            larger than the lde blowup factor {lde_blowup_factor}"
        );
    }

    fn trace_domain(&self) -> Radix2EvaluationDomain<Self::Fp> {
        let trace_len = self.trace_len();
        Radix2EvaluationDomain::new(trace_len).unwrap()
    }

    /// Constraint evaluation domain
    fn ce_domain(&self) -> Radix2EvaluationDomain<Self::Fp> {
        let offset = self.domain_offset();
        let trace_len = self.trace_len();
        let ce_blowup_factor = self.ce_blowup_factor();
        Radix2EvaluationDomain::new_coset(trace_len * ce_blowup_factor, offset).unwrap()
    }

    /// Low degree extension domain
    fn lde_domain(&self) -> Radix2EvaluationDomain<Self::Fp> {
        let offset = self.domain_offset();
        let trace_len = self.trace_len();
        let lde_blowup_factor = self.lde_blowup_factor();
        Radix2EvaluationDomain::new_coset(trace_len * lde_blowup_factor, offset).unwrap()
    }

    // TODO: consider changing back to borrow
    fn constraints(&self) -> Vec<AlgebraicExpression<Self::Fp, Self::Fq>>;

    fn get_challenges(&self, public_coin: &mut PublicCoin<impl Digest>) -> Challenges<Self::Fq> {
        let mut num_challenges = 0;
        for constraint in self.constraints() {
            constraint.traverse(&mut |node| {
                if let AlgebraicExpression::Challenge(i) = node {
                    num_challenges = core::cmp::max(num_challenges, *i + 1)
                }
            })
        }

        if num_challenges == 0 {
            Challenges::default()
        } else {
            let mut rng = public_coin.draw_rng();
            Challenges::new(&mut rng, num_challenges)
        }
    }

    fn get_hints(&self, _challenges: &Challenges<Self::Fq>) -> Hints<Self::Fq> {
        Hints::default()
    }

    // TODO: make this generic
    fn get_constraint_composition_coeffs(
        &self,
        public_coin: &mut PublicCoin<impl Digest>,
    ) -> Vec<(Self::Fq, Self::Fq)> {
        let mut rng = public_coin.draw_rng();
        (0..self.constraints().len())
            .map(|_| (Self::Fq::rand(&mut rng), Self::Fq::rand(&mut rng)))
            .collect()
    }

    fn trace_arguments(&self) -> BTreeSet<(usize, isize)> {
        self.constraints()
            .iter()
            .map(AlgebraicExpression::trace_arguments)
            .fold(BTreeSet::new(), |a, b| &a | &b)
    }

    // TODO: make this generic
    /// Output is of the form `(trace_coeffs, composition_coeffs,
    /// degree_adjustment_coeffs)`
    fn get_deep_composition_coeffs(
        &self,
        public_coin: &mut PublicCoin<impl Digest>,
    ) -> DeepCompositionCoeffs<Self::Fq> {
        let mut rng = public_coin.draw_rng();

        // execution trace coeffs
        let mut execution_trace_coeffs = Vec::new();
        for _ in self.trace_arguments() {
            execution_trace_coeffs.push(Self::Fq::rand(&mut rng));
        }

        // composition trace coeffs
        let num_composition_trace_cols = self.ce_blowup_factor();
        let mut composition_trace_coeffs = Vec::new();
        for _ in 0..num_composition_trace_cols {
            composition_trace_coeffs.push(Self::Fq::rand(&mut rng));
        }

        DeepCompositionCoeffs {
            execution_trace: execution_trace_coeffs,
            composition_trace: composition_trace_coeffs,
            degree: (Self::Fq::rand(&mut rng), Self::Fq::rand(&mut rng)),
        }
    }

    #[cfg(all(feature = "std", debug_assertions))]
    fn validate_constraints(
        &self,
        challenges: &Challenges<Self::Fq>,
        hints: &Hints<Self::Fq>,
        base_trace: &crate::Matrix<Self::Fp>,
        extension_trace: Option<&crate::Matrix<Self::Fq>>,
    ) {
        use crate::constraints::FieldConstant;
        use AlgebraicExpression::*;

        let trace_info = self.trace_info();
        let num_execution_trace_columns =
            trace_info.num_base_columns + trace_info.num_extension_columns;

        let mut col_indicies = vec![false; num_execution_trace_columns];
        let mut challenge_indicies = vec![false; challenges.len()];
        let mut hint_indicies = vec![false; hints.len()];

        for constraint in self.constraints() {
            constraint.traverse(&mut |node| {
                use AlgebraicExpression::*;
                match node {
                    Challenge(i) => challenge_indicies[*i] = true,
                    Trace(i, _) => col_indicies[*i] = true,
                    Hint(i) => hint_indicies[*i] = true,
                    _ => {}
                }
            })
        }

        for (index, exists) in col_indicies.into_iter().enumerate() {
            if !exists {
                // TODO: make assertion
                println!("WARN: no constraints for execution trace column {index}");
            }
        }

        for (index, exists) in challenge_indicies.into_iter().enumerate() {
            if !exists {
                // TODO: make assertion
                println!("WARN: challenge at index {index} never used");
            }
        }

        for (index, exists) in hint_indicies.into_iter().enumerate() {
            if !exists {
                // TODO: make assertion
                println!("WARN: hint at index {index} never used");
            }
        }

        let trace_domain = self.trace_domain();
        let base_column_range = trace_info.base_columns_range();
        let extension_column_range = trace_info.extension_columns_range();

        // helper function to get a value from the execution trace
        let get_trace_value = |row: usize, col: usize, offset: isize| {
            let pos = (row as isize + offset).rem_euclid(trace_domain.size() as isize) as usize;
            if base_column_range.contains(&col) {
                FieldConstant::Fp(base_trace.0[col][pos])
            } else if extension_column_range.contains(&col) {
                let col = col - trace_info.num_base_columns;
                FieldConstant::Fq(extension_trace.unwrap().0[col][pos])
            } else {
                unreachable!("requested column {col} does not exist")
            }
        };

        for (c_idx, constraint) in self.constraints().into_iter().enumerate() {
            for (row, x) in trace_domain.elements().enumerate() {
                let is_valid = constraint
                    .check(
                        &FieldConstant::Fp(x),
                        &|i| FieldConstant::Fq(hints[i]),
                        &|i| FieldConstant::Fq(challenges[i]),
                        &|col, offset| get_trace_value(row, col, offset),
                    )
                    .is_some();

                if !is_valid {
                    let mut vals = vec![format!("x = {x}")];
                    constraint.traverse(&mut |node| match *node {
                        // get a description of each leaf node
                        Trace(col, offset) => vals.push(format!(
                            "Trace(col={col:0>3}, offset={offset:0>3}) = {}",
                            get_trace_value(row, col, offset)
                        )),
                        Challenge(i) => vals.push(format!("Challenge({i}) = {}", challenges[i])),
                        Hint(i) => vals.push(format!("Hint({i}) = {}", hints[i])),

                        // skip tree nodes
                        _ => (),
                    });

                    vals.sort();
                    vals.dedup();

                    // TODO: display constraint? eprintln!("Constraint is:\n{constraint}\n");
                    #[cfg(feature = "std")]
                    eprint!("Constraint {c_idx} does not evaluate to a low degree polynomial. ");
                    #[cfg(feature = "std")]
                    eprintln!("Divide by zero occurs at row {row}.\n");
                    #[cfg(feature = "std")]
                    eprintln!("Expression values:\n{}", vals.join("\n"));
                    panic!();
                }
            }
        }
    }
}
