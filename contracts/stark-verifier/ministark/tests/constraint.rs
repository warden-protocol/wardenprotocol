#![feature(allocator_api)]
use ark_ff::FftField;
use ark_ff::Field;
use ark_ff::One;
use ark_ff::UniformRand;
use ark_ff::Zero;
use ark_poly::univariate::DensePolynomial;
use ark_poly::DenseUVPolynomial;
use ark_poly::EvaluationDomain;
use ark_poly::Polynomial;
use ark_poly::Radix2EvaluationDomain;
use ark_std::rand::seq::SliceRandom;
use ark_std::rand::Rng;
use core::marker::PhantomData;
use gpu_poly::allocator::PageAlignedAllocator;
use gpu_poly::fields::p18446744069414584321::Fp;
use gpu_poly::GpuFftField;
use gpu_poly::GpuField;
use ministark::constraints::AlgebraicExpression;
use ministark::constraints::ExecutionTraceColumn;
use ministark::constraints::FieldConstant;
use ministark::constraints::VerifierChallenge;
use ministark::utils;
use ministark::Air;
use ministark::Matrix;
use ministark::ProofOptions;
use ministark::StarkExtensionOf;
use ministark::TraceInfo;

struct TestAir<Fp, Fq = Fp>(TraceInfo, ProofOptions, PhantomData<(Fp, Fq)>);

impl<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>> Air for TestAir<Fp, Fq> {
    type Fp = Fp;
    type Fq = Fq;
    type PublicInputs = ();

    fn new(info: TraceInfo, _: Self::PublicInputs, options: ProofOptions) -> Self {
        TestAir(info, options, PhantomData)
    }

    fn pub_inputs(&self) -> &Self::PublicInputs {
        &()
    }

    fn trace_info(&self) -> &ministark::TraceInfo {
        &self.0
    }

    fn options(&self) -> &ministark::ProofOptions {
        &self.1
    }

    fn constraints(&self) -> Vec<AlgebraicExpression<Self::Fp, Self::Fq>> {
        todo!()
    }
}

#[test]
fn expressions_are_equal() {
    use AlgebraicExpression::*;
    let mut rng = ark_std::test_rng();
    let x = Fp::rand(&mut rng);
    let left: AlgebraicExpression<Fp> = X;
    let right: AlgebraicExpression<Fp> = X.pow(2) / X;

    assert_eq!(left.evaluation_hash(x), right.evaluation_hash(x));
}

#[test]
fn expressions_are_unequal() {
    use AlgebraicExpression::*;
    let mut rng = ark_std::test_rng();
    let x = Fp::rand(&mut rng);
    let left: AlgebraicExpression<Fp> = X;
    let right: AlgebraicExpression<Fp> = X.pow(3) / X;

    assert_ne!(left.evaluation_hash(x), right.evaluation_hash(x));
}

#[test]
fn constraint_with_challenges() {
    // TODO: hints
    let constraint: AlgebraicExpression<Fp> = (0.challenge() - 0.curr()) * 1.curr();
    let challenges = [Fp::one()];
    let col_values = [Fp::one(), Fp::from(100)];

    assert!(constraint
        .eval(
            &FieldConstant::Fp(Fp::one()),
            &|_| unreachable!(),
            &|i| FieldConstant::Fp(challenges[i]),
            &|i, j| {
                assert_eq!(0, j);
                FieldConstant::Fp(col_values[i])
            }
        )
        .is_zero());
}

#[test]
fn symbolic_evaluation_with_challenges() {
    let n = 2048;
    let constraint = (0.curr() - 0.challenge()) * (0.curr() - 1.challenge());
    let (numerator_degree, denominator_degree) = constraint.degree(n);
    let blowup = utils::ceil_power_of_two((numerator_degree - denominator_degree) / n);
    let trace_domain = Radix2EvaluationDomain::<Fp>::new(n).unwrap();
    let lde_domain = Radix2EvaluationDomain::<Fp>::new_coset(n * blowup, Fp::GENERATOR).unwrap();
    let alpha = Fp::from(3);
    let beta = Fp::from(7);
    let matrix = gen_binary_valued_matrix(n, alpha, beta);
    let poly_matrix = matrix.interpolate(trace_domain);
    let lde_matrix = poly_matrix.evaluate(lde_domain);

    let constraint_eval = evaluate_symbolic(
        lde_domain,
        blowup,
        &[],
        &[alpha, beta],
        &constraint,
        &lde_matrix,
    );

    let constraint_eval_poly = constraint_eval.interpolate(lde_domain);
    assert_valid_over_transition_domain(trace_domain, constraint_eval_poly);
}

#[test]
fn constraint_multiplication() {
    let zero = FieldConstant::Fp(Fp::zero());
    let one = FieldConstant::Fp(Fp::one());
    let two = one + one;
    let three = two + one;
    let four = three + one;
    let five = four + one;
    let six = five + one;
    let seven = six + one;
    let eight = seven + one;
    let nine = eight + one;
    let ten = nine + one;
    let eleven = ten + one;
    let twelve = eleven + one;

    // checks the column values are between 0 and 10
    let between_0_and_10 = (0.curr() - one)
        * (0.curr() - two)
        * (0.curr() - three)
        * (0.curr() - four)
        * (0.curr() - five)
        * (0.curr() - six)
        * (0.curr() - seven)
        * (0.curr() - eight)
        * (0.curr() - nine);

    let x = FieldConstant::Fp(Fp::one());
    let h = &|_| unreachable!();
    let c = &|_| unreachable!();
    let t = |val: FieldConstant<Fp, Fp>| {
        move |i, j| {
            assert_eq!(0, i, "for value {val}");
            assert_eq!(0, j, "for value {val}");
            val
        }
    };

    assert!(!between_0_and_10.eval(&x, h, c, &t(-two)).is_zero());
    assert!(!between_0_and_10.eval(&x, h, c, &t(-one)).is_zero());
    assert!(!between_0_and_10.eval(&x, h, c, &t(zero)).is_zero());
    assert!(between_0_and_10.eval(&x, h, c, &t(one)).is_zero());
    assert!(between_0_and_10.eval(&x, h, c, &t(two)).is_zero());
    assert!(between_0_and_10.eval(&x, h, c, &t(three)).is_zero());
    assert!(between_0_and_10.eval(&x, h, c, &t(four)).is_zero());
    assert!(between_0_and_10.eval(&x, h, c, &t(five)).is_zero());
    assert!(between_0_and_10.eval(&x, h, c, &t(six)).is_zero());
    assert!(between_0_and_10.eval(&x, h, c, &t(seven)).is_zero());
    assert!(between_0_and_10.eval(&x, h, c, &t(eight)).is_zero());
    assert!(between_0_and_10.eval(&x, h, c, &t(nine)).is_zero());
    assert!(!between_0_and_10.eval(&x, h, c, &t(ten)).is_zero());
    assert!(!between_0_and_10.eval(&x, h, c, &t(eleven)).is_zero());
    assert!(!between_0_and_10.eval(&x, h, c, &t(twelve)).is_zero());
}

#[test]
fn evaluate_fibonacci_constraint() {
    let n = 2048;
    let trace_domain = Radix2EvaluationDomain::<Fp>::new(n).unwrap();
    let lde_domain = trace_domain.get_coset(Fp::GENERATOR).unwrap();
    let matrix = gen_fib_matrix(n);
    let poly_matrix = matrix.interpolate(trace_domain);
    let lde_matrix = poly_matrix.evaluate(lde_domain);
    let constraints: Vec<AlgebraicExpression<Fp>> = vec![
        0.next() - (0.curr() + 1.curr()),
        1.next() - (0.next() + 1.curr()),
    ];

    let constraint_evals = Matrix::join(
        constraints
            .into_iter()
            .map(|c| evaluate_symbolic(lde_domain, 1, &[], &[], &c, &lde_matrix))
            .collect(),
    );

    let constraint_evals_poly = constraint_evals.interpolate(lde_domain);
    assert_valid_over_transition_domain(trace_domain, constraint_evals_poly);
}

#[test]
fn evaluate_binary_constraint() {
    let n = 2048;
    // constrains column 0 values to 0 or 1
    let constraint = 0.curr() * (0.curr() - FieldConstant::Fp(Fp::one()));
    let (numerator_degree, denominator_degree) = constraint.degree(n);
    let blowup = utils::ceil_power_of_two((numerator_degree - denominator_degree) / n);
    let trace_domain = Radix2EvaluationDomain::<Fp>::new(n).unwrap();
    let lde_domain = Radix2EvaluationDomain::<Fp>::new_coset(n * blowup, Fp::GENERATOR).unwrap();
    let matrix = gen_binary_valued_matrix(n, Fp::zero(), Fp::one());
    let poly_matrix = matrix.interpolate(trace_domain);
    let lde_matrix = poly_matrix.evaluate(lde_domain);

    let constraint_eval = evaluate_symbolic(lde_domain, blowup, &[], &[], &constraint, &lde_matrix);

    let constraint_eval_poly = constraint_eval.interpolate(lde_domain);
    assert_valid_over_transition_domain(trace_domain, constraint_eval_poly);
}

#[test]
fn evaluate_permutation_constraint() {
    let n = 2048;
    let mut rng = ark_std::test_rng();
    let original_col = (0..n).map(|_| Fp::rand(&mut rng)).collect::<Vec<Fp>>();
    let mut shuffled_col = original_col.clone();
    shuffled_col.shuffle(&mut rng);
    let challenge = Fp::rand(&mut rng); // verifier challenge
    let original_product = original_col
        .iter()
        .scan(Fp::one(), |product, v| {
            let ret = *product;
            *product *= challenge - v;
            Some(ret)
        })
        .collect::<Vec<Fp>>();
    let shuffled_product = shuffled_col
        .iter()
        .scan(Fp::one(), |product, v| {
            let ret = *product;
            *product *= challenge - v;
            Some(ret)
        })
        .collect::<Vec<Fp>>();
    let matrix = Matrix::new(vec![
        original_col.to_vec_in(PageAlignedAllocator),
        shuffled_col.to_vec_in(PageAlignedAllocator),
        original_product.to_vec_in(PageAlignedAllocator),
        shuffled_product.to_vec_in(PageAlignedAllocator),
    ]);
    let alpha = 0; // first verifier challenge
    let original_col = 0;
    let shuffled_col = 1;
    let original_product = 2;
    let shuffled_product = 3;
    let constraints = vec![
        original_product.curr() * (alpha.challenge() - original_col.curr())
            - original_product.next(),
        shuffled_product.curr() * (alpha.challenge() - shuffled_col.curr())
            - shuffled_product.next(),
    ];
    let blowup = 2;
    let trace_domain = Radix2EvaluationDomain::new(n).unwrap();
    let lde_domain = Radix2EvaluationDomain::new_coset(n * blowup, Fp::GENERATOR).unwrap();
    let poly_matrix = matrix.interpolate(trace_domain);
    let lde_matrix = poly_matrix.evaluate(lde_domain);

    let constraint_evals = Matrix::join(
        constraints
            .into_iter()
            .map(|c| evaluate_symbolic(lde_domain, blowup, &[], &[challenge], &c, &lde_matrix))
            .collect(),
    );

    let last_original_val = matrix.0[original_col].last().unwrap();
    let last_shuffled_val = matrix.0[shuffled_col].last().unwrap();
    let last_original_product = matrix.0[original_product].last().unwrap();
    let last_shuffled_product = matrix.0[shuffled_product].last().unwrap();
    let final_original_product = *last_original_product * (challenge - last_original_val);
    let final_shuffled_product = *last_shuffled_product * (challenge - last_shuffled_val);
    assert_eq!(final_original_product, final_shuffled_product);
    let constraint_eval_poly = constraint_evals.interpolate(lde_domain);
    assert_valid_over_transition_domain(trace_domain, constraint_eval_poly);
}

#[test]
fn evaluate_zerofier_constraint() {
    // TODO: clean up this testcase
    let n = 2048;
    let challenges = &[Fp::from(999), Fp::from(43)];
    let curr_instr = 0;
    let permutation = 1;
    let alpha = 0;
    let a = 1;
    let instr = Fp::from(b'+');
    let constraint = curr_instr.curr()
        * (permutation.curr() * (alpha.challenge() - a.challenge() * curr_instr.curr())
            - permutation.next())
        + (curr_instr.curr() - FieldConstant::Fp(instr))
            * (permutation.curr() - permutation.next());
    let blowup = 16;
    let trace_domain = Radix2EvaluationDomain::<Fp>::new(n).unwrap();
    let lde_domain = Radix2EvaluationDomain::<Fp>::new_coset(n * blowup, Fp::GENERATOR).unwrap();
    let curr_instr_column = vec![instr; n].to_vec_in(PageAlignedAllocator);
    let permutation_column = (0..n)
        .scan(Fp::one(), |acc, i| {
            let ret = *acc;
            *acc *= challenges[alpha] - challenges[a] * curr_instr_column[i];
            Some(ret)
        })
        .collect::<Vec<Fp>>()
        .to_vec_in(PageAlignedAllocator);
    let matrix = Matrix::new(vec![curr_instr_column, permutation_column]);
    let poly_matrix = matrix.interpolate(trace_domain);
    let lde_matrix = poly_matrix.evaluate(lde_domain);

    let constraint_eval = evaluate_symbolic(
        lde_domain,
        blowup,
        &[],
        challenges,
        &constraint,
        &lde_matrix,
    );

    let constraint_eval_poly = constraint_eval.interpolate(lde_domain);
    assert_valid_over_transition_domain(trace_domain, constraint_eval_poly);
}

/// Generates a matrix of fibbonacci sequence across two columns i.e.
/// ┌───────┬───────┐
/// │ Col 0 | Col 1 │
/// ├───────┼───────┤
/// │ 1     │ 1     │ #1 -> #2 ->
/// ├───────┼───────┤
/// │ 2     │ 3     │ #3 -> #4 ->
/// ├───────┼───────┤
/// │ 5     │ 8     │ #5 -> #6 ->
/// ├───────┼───────┤
/// │ ...   │ ...   │ ...
/// └───────┴───────┘
fn gen_fib_matrix<F: Field>(n: usize) -> Matrix<F> {
    let mut columns = vec![
        Vec::with_capacity_in(n, PageAlignedAllocator),
        Vec::with_capacity_in(n, PageAlignedAllocator),
    ];
    columns[0].push(F::one());
    columns[1].push(F::one());
    for _ in 1..n {
        let n0 = *columns[0].last().unwrap() + columns[1].last().unwrap();
        let n1 = n0 + columns[1].last().unwrap();
        columns[0].push(n0);
        columns[1].push(n1);
    }
    Matrix::new(columns)
}

/// Generates a single column matrix consisting of two values i.e.
/// ┌───────┐
/// │ Col 0 │
/// ├───────┤
/// │ 3     │
/// ├───────┤
/// │ 7     │
/// ├───────┤
/// │ 3     │
/// ├───────┤
/// │ 3     │
/// ├───────┤
/// │ 7     │
/// ├───────┤
/// │ ...   │
/// └───────┘
fn gen_binary_valued_matrix<F: GpuField + Field>(n: usize, v1: F, v2: F) -> Matrix<F> {
    let mut rng = ark_std::test_rng();
    let mut col = Vec::with_capacity_in(n, PageAlignedAllocator);
    for _ in 0..n {
        if rng.gen() {
            col.push(v1)
        } else {
            col.push(v2);
        }
    }
    Matrix::new(vec![col])
}

fn assert_valid_over_transition_domain<F: GpuField + Field>(
    domain: Radix2EvaluationDomain<F::FftField>,
    poly_matrix: Matrix<F>,
) where
    F: From<F::FftField>,
    F::FftField: FftField,
{
    let mut x_values = domain.elements().map(|e| e.into()).collect::<Vec<F>>();
    // transition constraints apply to all rows except the last.
    x_values.pop();
    for (i, column) in poly_matrix.iter().enumerate() {
        let poly = DensePolynomial::from_coefficients_slice(column);
        for (j, x) in x_values.iter().enumerate() {
            let y = poly.evaluate(x);
            assert!(y.is_zero(), "polynomial {i} invalid at index {j}");
        }
    }
}

/// TODO: consider merging with ConstraintComposer::evaluate_constraint_cpu
fn evaluate_symbolic<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>>(
    lde_domain: Radix2EvaluationDomain<Fp>,
    blowup_factor: usize,
    hints: &[Fq],
    challenges: &[Fq],
    constraint: &AlgebraicExpression<Fp, Fq>,
    lde_matrix: &Matrix<Fq>,
) -> Matrix<Fq> {
    let blowup_factor = blowup_factor as isize;
    let xs = lde_domain.elements();
    let n = lde_domain.size();
    let mut result = Vec::with_capacity_in(n, PageAlignedAllocator);
    result.resize(n, Fq::zero());

    for (i, (v, x)) in result.iter_mut().zip(xs).enumerate() {
        let eval_result = constraint.eval(
            &FieldConstant::Fp(x),
            &|h| FieldConstant::Fq(hints[h]),
            &|c| FieldConstant::Fq(challenges[c]),
            &|col_idx, offset| {
                let pos = (i as isize + blowup_factor * offset).rem_euclid(n as isize) as usize;
                let column = &lde_matrix[col_idx];
                FieldConstant::Fq(column[pos])
            },
        );

        *v = match eval_result {
            FieldConstant::Fp(v) => Fq::from(v),
            FieldConstant::Fq(v) => v,
        };
    }

    Matrix::new(vec![result])
}
