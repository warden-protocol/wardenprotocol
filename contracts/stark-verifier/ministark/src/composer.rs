use crate::challenges::Challenges;
use crate::constraints::AlgebraicExpression;
use crate::constraints::FieldConstant;
use crate::hints::Hints;
use crate::merkle::MerkleTree;
use crate::utils;
use crate::utils::divide_out_point_into;
use crate::utils::horner_evaluate;
use crate::Air;
use crate::Matrix;
use alloc::vec::Vec;
use ark_ff::Field;
use ark_ff::Zero;
use ark_poly::EvaluationDomain;
use gpu_poly::prelude::*;
#[cfg(feature = "parallel")]
use rayon::prelude::*;
use sha2::Sha256;

pub struct ConstraintComposer<'a, A: Air> {
    air: &'a A,
    composition_coeffs: Vec<(A::Fq, A::Fq)>,
}

impl<'a, A: Air> ConstraintComposer<'a, A> {
    pub fn new(air: &'a A, composition_coeffs: Vec<(A::Fq, A::Fq)>) -> Self {
        ConstraintComposer {
            air,
            composition_coeffs,
        }
    }

    #[cfg(feature = "gpu")]
    pub fn evaluate_constraint_gpu(
        &self,
        composition_constraint: AlgebraicExpression<A::Fp, A::Fq>,
        challenges: &Challenges<A::Fq>,
        hints: &Hints<A::Fq>,
        base_trace_lde: Matrix<A::Fp>,
        extension_trace_lde: Option<Matrix<A::Fq>>,
    ) -> Matrix<A::Fq> {
        use crate::calculator::lde_calculator;
        use crate::constraints::EvaluationLde;
        let command_queue = &PLANNER.command_queue;
        let device = command_queue.device();

        #[cfg(debug_assertions)]
        let expected_result = self.evaluate_constraint_cpu(
            &composition_constraint,
            challenges,
            hints,
            &base_trace_lde,
            extension_trace_lde.as_ref(),
        );

        let mut trace_ldes = Vec::new();

        for lde in base_trace_lde.0.into_iter() {
            let gpu_buffer = buffer_no_copy(device, &lde);
            trace_ldes.push(Some(EvaluationLde::Fp(lde, gpu_buffer)));
        }

        for lde in extension_trace_lde.into_iter().flatten() {
            let gpu_buffer = buffer_no_copy(device, &lde);
            trace_ldes.push(Some(EvaluationLde::Fq(lde, gpu_buffer)));
        }

        let result = lde_calculator(
            self.air,
            composition_constraint,
            &|i| FieldConstant::Fq(hints[i]),
            &|i| FieldConstant::Fq(challenges[i]),
            &mut |i| trace_ldes[i].take().unwrap(),
        );

        #[cfg(debug_assertions)]
        expected_result.0[0]
            .iter()
            .zip(&result.0[0])
            .enumerate()
            .for_each(|(i, (expected, actual))| {
                assert_eq!(expected, actual, "mismatch at {i}");
            });

        result
    }

    #[cfg(any(not(feature = "gpu"), debug_assertions))]
    pub fn evaluate_constraint_cpu(
        &self,
        composition_constraint: &AlgebraicExpression<A::Fp, A::Fq>,
        challenges: &Challenges<A::Fq>,
        hints: &Hints<A::Fq>,
        base_trace_lde: &Matrix<A::Fp>,
        extension_trace_lde: Option<&Matrix<A::Fq>>,
    ) -> Matrix<A::Fq> {
        let ce_domain = self.air.ce_domain();
        let step = self.air.ce_blowup_factor() as isize;
        let xs = ce_domain.elements();
        let n = ce_domain.size();
        let mut result = Vec::with_capacity_in(n, PageAlignedAllocator);
        result.resize(n, A::Fq::zero());

        let trace_info = self.air.trace_info();
        let base_columns_range = trace_info.base_columns_range();
        let extension_columns_range = trace_info.extension_columns_range();

        for (i, (v, x)) in result.iter_mut().zip(xs).enumerate() {
            let eval_result = composition_constraint.eval(
                &FieldConstant::Fp(x),
                &|h| FieldConstant::Fq(hints[h]),
                &|c| FieldConstant::Fq(challenges[c]),
                &|col_idx, offset| {
                    let position = (i as isize + step * offset).rem_euclid(n as isize) as usize;
                    if base_columns_range.contains(&col_idx) {
                        let column = &base_trace_lde[col_idx];
                        FieldConstant::Fp(column[position])
                    } else if extension_columns_range.contains(&col_idx) {
                        let extension_column_offset = col_idx - trace_info.num_base_columns;
                        let column = &extension_trace_lde.unwrap()[extension_column_offset];
                        FieldConstant::Fq(column[position])
                    } else {
                        panic!("invalid column {col_idx}")
                    }
                },
            );

            *v = match eval_result {
                FieldConstant::Fp(v) => A::Fq::from(v),
                FieldConstant::Fq(v) => v,
            };
        }

        Matrix::new(vec![result])
    }

    pub fn evaluate(
        &mut self,
        challenges: &Challenges<A::Fq>,
        hints: &Hints<A::Fq>,
        mut base_trace_lde: Matrix<A::Fp>,
        mut extension_trace_lde: Option<Matrix<A::Fq>>,
    ) -> Matrix<A::Fq> {
        use AlgebraicExpression::*;
        let trace_degree = self.air.trace_len() - 1;
        let composition_degree = self.air.composition_degree();

        // only a subset of the execution trace LDE evaluations need to be used for
        // constraint evaluation. The less values that are used the faster
        // constraint evaluation is.
        // TODO: reduce_lde_blowup_factor should take in an lde and output the reduced
        // LDE along with the now unused LDEs space. This will prevent having to
        // allocate memory buffers during constraint evaluation.
        let lde_blowup_factor = self.air.lde_blowup_factor();
        let ce_blowup_factor = self.air.ce_blowup_factor();
        ark_std::cfg_iter_mut!(base_trace_lde).for_each(|column| {
            utils::reduce_lde_blowup_factor(column, lde_blowup_factor, ce_blowup_factor)
        });

        if let Some(extension_trace_lde) = &mut extension_trace_lde {
            ark_std::cfg_iter_mut!(extension_trace_lde).for_each(|column| {
                utils::reduce_lde_blowup_factor(column, lde_blowup_factor, ce_blowup_factor)
            });
        }

        // Constraint composition as in:
        // https://medium.com/starkware/starkdex-deep-dive-the-stark-core-engine-497942d0f0ab
        let composition_constraint = self
            .air
            .constraints()
            .iter()
            .enumerate()
            .map(|(i, constraint)| {
                let (numerator_degree, denominator_degree) = constraint.degree(trace_degree);
                let evaluation_degree = numerator_degree - denominator_degree;
                assert!(evaluation_degree <= composition_degree);
                let degree_adjustment = composition_degree - evaluation_degree;
                let (alpha, beta) = self.composition_coeffs[i];
                // TODO: would be nice to use Fp is Fq and Fp are the same
                constraint
                    * (X.pow(degree_adjustment) * FieldConstant::Fq(alpha)
                        + FieldConstant::Fq(beta))
            })
            .sum::<AlgebraicExpression<A::Fp, A::Fq>>();

        #[cfg(feature = "gpu")]
        return self.evaluate_constraint_gpu(
            composition_constraint,
            challenges,
            hints,
            base_trace_lde,
            extension_trace_lde,
        );
        #[cfg(not(feature = "gpu"))]
        return self.evaluate_constraint_cpu(
            &composition_constraint,
            challenges,
            hints,
            &base_trace_lde,
            extension_trace_lde.as_ref(),
        );
    }

    fn trace_polys(&self, composed_evaluations: Matrix<A::Fq>) -> Matrix<A::Fq> {
        assert_eq!(composed_evaluations.num_cols(), 1);
        let composition_poly = composed_evaluations.into_polynomials(self.air.ce_domain());
        let num_composition_trace_cols = self.air.ce_blowup_factor();
        if num_composition_trace_cols == 1 {
            composition_poly
        } else {
            Matrix::from_rows(
                GpuVec::try_from(composition_poly)
                    .unwrap()
                    .chunks(num_composition_trace_cols)
                    .map(|chunk| chunk.to_vec())
                    .collect(),
            )
        }
    }

    /// builds a commitment to the composed trace polynomial.
    /// Output is of the form `(lde, poly, lde_merkle_tree)`
    pub fn build_commitment(
        mut self,
        challenges: &Challenges<A::Fq>,
        hints: &Hints<A::Fq>,
        base_trace_lde: Matrix<A::Fp>,
        extension_trace_lde: Option<Matrix<A::Fq>>,
    ) -> (Matrix<A::Fq>, Matrix<A::Fq>, MerkleTree<Sha256>) {
        let composed_evaluations =
            self.evaluate(challenges, hints, base_trace_lde, extension_trace_lde);
        let composition_trace_polys = self.trace_polys(composed_evaluations);
        let composition_trace_lde = composition_trace_polys.evaluate(self.air.lde_domain());
        let merkle_tree = composition_trace_lde.commit_to_rows();
        (composition_trace_lde, composition_trace_polys, merkle_tree)
    }
}

pub struct DeepPolyComposer<'a, A: Air> {
    z: A::Fq,
    air: &'a A,
    base_trace_polys: &'a Matrix<A::Fp>,
    extension_trace_polys: Option<&'a Matrix<A::Fq>>,
    composition_trace_polys: Matrix<A::Fq>,
}

impl<'a, A: Air> DeepPolyComposer<'a, A> {
    pub fn new(
        air: &'a A,
        z: A::Fq,
        base_trace_polys: &'a Matrix<A::Fp>,
        extension_trace_polys: Option<&'a Matrix<A::Fq>>,
        composition_trace_polys: Matrix<A::Fq>,
    ) -> Self {
        DeepPolyComposer {
            z,
            air,
            base_trace_polys,
            extension_trace_polys,
            composition_trace_polys,
        }
    }

    /// Output is of the form `(execution_trace_evals, composition_trace_evals)`
    pub fn get_ood_evals(&mut self) -> (Vec<A::Fq>, Vec<A::Fq>) {
        let Self {
            z,
            air,
            base_trace_polys,
            extension_trace_polys,
            composition_trace_polys,
            ..
        } = self;

        let trace_domain = air.trace_domain();
        let g = trace_domain.group_gen();
        let g_inv = trace_domain.group_gen_inv();

        // generate ood evaluations for the execution trace polynomials
        let trace_info = air.trace_info();
        let base_columns_range = trace_info.base_columns_range();
        let extension_columns_range = trace_info.extension_columns_range();
        let execution_trace_evals = ark_std::cfg_into_iter!(air.trace_arguments())
            .map(|(column, offset)| {
                let x = *z * if offset >= 0 { g } else { g_inv }.pow([offset.abs() as u64]);
                if base_columns_range.contains(&column) {
                    let coeffs = &base_trace_polys[column];
                    horner_evaluate(coeffs, &x)
                } else if extension_columns_range.contains(&column) {
                    let coeffs =
                        &extension_trace_polys.unwrap()[column - trace_info.num_base_columns];
                    horner_evaluate(coeffs, &x)
                } else {
                    panic!(
                        "column is {column} but there are only {} columns",
                        trace_info.num_base_columns + trace_info.num_extension_columns
                    )
                }
            })
            .collect();

        // generate ood evaluations for the composition trace polynomials
        let z_n = self.z.pow([composition_trace_polys.num_cols() as u64]);
        let composition_trace_evals = ark_std::cfg_iter!(composition_trace_polys)
            .map(|column| horner_evaluate(column, &z_n))
            .collect();

        (execution_trace_evals, composition_trace_evals)
    }

    pub fn into_deep_poly(self, composition_coeffs: DeepCompositionCoeffs<A::Fq>) -> Matrix<A::Fq> {
        let Self {
            z,
            air,
            base_trace_polys,
            extension_trace_polys,
            composition_trace_polys,
            ..
        } = self;

        let DeepCompositionCoeffs {
            execution_trace: execution_trace_alphas,
            composition_trace: composition_trace_alphas,
            degree: (degree_alpha, degree_beta),
        } = composition_coeffs;

        let trace_domain = air.trace_domain();
        let g = trace_domain.group_gen();
        let g_inv = trace_domain.group_gen_inv();

        // divide out OOD point from composition trace polys
        let z_n = self.z.pow([composition_trace_polys.num_cols() as u64]);
        let composition_trace_quotients = Matrix::new(
            ark_std::cfg_into_iter!(composition_trace_polys.0)
                .zip(composition_trace_alphas)
                .map(|(coeffs, alpha)| {
                    let mut res = Vec::new_in(PageAlignedAllocator);
                    res.resize(trace_domain.size(), A::Fq::zero());
                    divide_out_point_into(&mut res, &coeffs, &z_n, &alpha);
                    res
                })
                .collect(),
        );

        // divide out OOD points from execution trace polys
        let trace_info = air.trace_info();
        let base_columns_range = trace_info.base_columns_range();
        let extension_columns_range = trace_info.extension_columns_range();
        // NOTE: ark_std::cfg_into_iter! doesn't work with
        // .zip() on BTreeSet but works with Vec.
        #[allow(clippy::needless_collect)]
        let trace_arguments = air.trace_arguments().into_iter().collect::<Vec<_>>();
        let execution_trace_quotients = Matrix::new(
            ark_std::cfg_into_iter!(trace_arguments)
                .zip(execution_trace_alphas)
                .map(|((col, offset), alpha)| {
                    let mut res = Vec::new_in(PageAlignedAllocator);
                    res.resize(trace_domain.size(), A::Fq::zero());
                    let x = z * if offset >= 0 { g } else { g_inv }.pow([offset.abs() as u64]);
                    if base_columns_range.contains(&col) {
                        let coeffs = &base_trace_polys[col];
                        divide_out_point_into(&mut res, coeffs, &x, &alpha);
                    } else if extension_columns_range.contains(&col) {
                        let coeffs =
                            &extension_trace_polys.unwrap()[col - trace_info.num_base_columns];
                        divide_out_point_into(&mut res, coeffs, &x, &alpha);
                    } else {
                        panic!(
                            "column is {col} but there are only {} columns",
                            trace_info.num_base_columns + trace_info.num_extension_columns
                        )
                    }
                    res
                })
                .collect(),
        );

        let quotients = Matrix::join(vec![execution_trace_quotients, composition_trace_quotients]);
        let mut combined_coeffs = GpuVec::try_from(quotients.sum_columns()).unwrap();

        // Adjust the degree
        // P(x) * (alpha + x * beta)
        let mut last = A::Fq::zero();
        for coeff in &mut combined_coeffs {
            let tmp = *coeff;
            *coeff *= degree_alpha;
            *coeff += last * degree_beta;
            last = tmp;
        }

        Matrix::new(vec![combined_coeffs])
    }
}

pub struct DeepCompositionCoeffs<F> {
    /// Execution trace poly coefficients
    pub execution_trace: Vec<F>,
    /// Composition trace poly coefficients
    pub composition_trace: Vec<F>,
    /// Degree adjustment coefficients
    pub degree: (F, F),
}
