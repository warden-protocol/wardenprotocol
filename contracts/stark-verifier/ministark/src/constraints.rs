// Implementation is adapted from RationalExpression in https://github.com/0xProject/OpenZKP

use crate::StarkExtensionOf;
use alloc::collections::BTreeMap;
use alloc::collections::BTreeSet;
use alloc::rc::Rc;
use alloc::vec::Vec;
use ark_ff::FftField;
use ark_ff::Field;
use ark_std::Zero;
use core::cell::RefCell;
use core::fmt::Display;
use core::hash::Hash;
use core::hash::Hasher;
use core::iter::Product;
use core::iter::Sum;
use core::ops::Add;
use core::ops::AddAssign;
use core::ops::Div;
use core::ops::DivAssign;
use core::ops::Mul;
use core::ops::MulAssign;
use core::ops::Neg;
use core::ops::Sub;
use core::ops::SubAssign;
use digest::Digest;
use gpu_poly::GpuFftField;
use sha2::Sha256;

fn from_bytes<F: Field>(bytes: &[u8]) -> F {
    let mut acc = F::one();
    for byte in bytes {
        acc += F::from(*byte);
        acc *= F::from(256u32);
    }
    acc
}

pub trait Hint {
    fn index(&self) -> usize;

    fn hint<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>>(
        &self,
    ) -> AlgebraicExpression<Fp, Fq> {
        AlgebraicExpression::Hint(self.index())
    }
}

impl Hint for usize {
    fn index(&self) -> usize {
        *self
    }
}

pub trait VerifierChallenge {
    /// Get the challenge index
    fn index(&self) -> usize;

    /// Symbolic representation of a challenge
    // TODO: terrible name. Needs refactoring
    fn challenge<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>>(
        &self,
    ) -> AlgebraicExpression<Fp, Fq> {
        AlgebraicExpression::Challenge(self.index())
    }
}

impl VerifierChallenge for usize {
    fn index(&self) -> usize {
        *self
    }
}

/// An interface for types that can symbolically represent a column of an
/// execution trace
pub trait ExecutionTraceColumn {
    /// Returns the execution trace column index
    fn index(&self) -> usize;

    // Create a constraint element for the current cycle
    fn curr<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>>(
        &self,
    ) -> AlgebraicExpression<Fp, Fq> {
        self.offset(0)
    }

    // Create a constraint element for the next cycle
    fn next<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>>(
        &self,
    ) -> AlgebraicExpression<Fp, Fq> {
        self.offset(1)
    }

    fn offset<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>>(
        &self,
        offset: isize,
    ) -> AlgebraicExpression<Fp, Fq> {
        AlgebraicExpression::Trace(self.index(), offset)
    }
}

impl ExecutionTraceColumn for usize {
    fn index(&self) -> usize {
        *self
    }
}

macro_rules! map {
    ($self:expr, $f1:ident $(, $x:expr)*) => {
        match $self {
            FieldConstant::Fp(v) => FieldConstant::Fp(v.$f1($($x)*)),
            FieldConstant::Fq(v) => FieldConstant::Fq(v.$f1($($x)*)),
        }
    }
}

#[derive(Clone, Copy, Debug, Hash)]
pub enum FieldConstant<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp> = Fp> {
    Fp(Fp),
    Fq(Fq),
}

impl<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>> FieldConstant<Fp, Fq> {
    /// Computes the multiplicative inverse of `self` if `self` is nonzero.
    pub fn inverse(&self) -> Option<Self> {
        match self {
            FieldConstant::Fp(v) => v.inverse().map(|v| FieldConstant::Fp(v)),
            FieldConstant::Fq(v) => v.inverse().map(|v| FieldConstant::Fq(v)),
        }
    }

    /// Exponentiates this element by a number represented with `u64` limbs,
    /// least significant limb first.
    pub fn pow<S: AsRef<[u64]>>(&self, exp: S) -> Self {
        map!(self, pow, exp)
    }

    pub fn as_fq(&self) -> Fq {
        match self {
            FieldConstant::Fp(v) => Fq::from(*v),
            FieldConstant::Fq(v) => *v,
        }
    }
}

impl<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>> Display for FieldConstant<Fp, Fq> {
    fn fmt(&self, f: &mut core::fmt::Formatter<'_>) -> core::fmt::Result {
        match self {
            FieldConstant::Fp(v) => Display::fmt(v, f),
            FieldConstant::Fq(v) => Display::fmt(v, f),
        }
    }
}

impl<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>> Zero for FieldConstant<Fp, Fq> {
    fn zero() -> Self {
        FieldConstant::Fp(Fp::zero())
    }

    fn is_zero(&self) -> bool {
        match self {
            FieldConstant::Fp(v) => v.is_zero(),
            FieldConstant::Fq(v) => v.is_zero(),
        }
    }
}

impl<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>> Add<FieldConstant<Fp, Fq>>
    for FieldConstant<Fp, Fq>
{
    type Output = FieldConstant<Fp, Fq>;

    fn add(self, rhs: FieldConstant<Fp, Fq>) -> Self::Output {
        match (self, rhs) {
            (FieldConstant::Fp(a), FieldConstant::Fp(b)) => FieldConstant::Fp(a + b),
            (FieldConstant::Fq(a), FieldConstant::Fq(b)) => FieldConstant::Fq(a + b),
            (FieldConstant::Fp(a), FieldConstant::Fq(b))
            | (FieldConstant::Fq(b), FieldConstant::Fp(a)) => FieldConstant::Fq(Fq::from(a) + b),
        }
    }
}

impl<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>> Mul<FieldConstant<Fp, Fq>>
    for FieldConstant<Fp, Fq>
{
    type Output = FieldConstant<Fp, Fq>;

    fn mul(self, rhs: FieldConstant<Fp, Fq>) -> Self::Output {
        match (self, rhs) {
            (FieldConstant::Fp(a), FieldConstant::Fp(b)) => FieldConstant::Fp(a * b),
            (FieldConstant::Fq(a), FieldConstant::Fq(b)) => FieldConstant::Fq(a * b),
            (FieldConstant::Fp(a), FieldConstant::Fq(b))
            | (FieldConstant::Fq(b), FieldConstant::Fp(a)) => FieldConstant::Fq(Fq::from(a) * b),
        }
    }
}

impl<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>> Neg for FieldConstant<Fp, Fq> {
    type Output = FieldConstant<Fp, Fq>;

    fn neg(self) -> Self::Output {
        map!(self, neg)
    }
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum FieldType {
    Fp,
    Fq,
}

#[derive(Debug)]
#[cfg(feature = "gpu")]
pub enum EvaluationLde<Fp, Fq> {
    Fp(gpu_poly::GpuVec<Fp>, metal::Buffer),
    Fq(gpu_poly::GpuVec<Fq>, metal::Buffer),
}

#[cfg(feature = "gpu")]
impl<Fp: gpu_poly::GpuField, Fq: gpu_poly::GpuField> EvaluationLde<Fp, Fq> {
    pub fn get_gpu_buffer(&self) -> &metal::BufferRef {
        match self {
            EvaluationLde::Fp(_, buff) => buff,
            EvaluationLde::Fq(_, buff) => buff,
        }
    }
}

#[derive(Clone, Debug)]
pub enum AlgebraicExpression<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp> = Fp> {
    X,
    Constant(FieldConstant<Fp, Fq>),
    Challenge(usize),
    Hint(usize),
    Trace(/* =column */ usize, /* =offset */ isize),
    #[cfg(feature = "gpu")]
    Lde(Rc<EvaluationLde<Fp, Fq>>, /* =offset */ isize),
    Add(
        Rc<RefCell<AlgebraicExpression<Fp, Fq>>>,
        Rc<RefCell<AlgebraicExpression<Fp, Fq>>>,
    ),
    Neg(Rc<RefCell<AlgebraicExpression<Fp, Fq>>>),
    Mul(
        Rc<RefCell<AlgebraicExpression<Fp, Fq>>>,
        Rc<RefCell<AlgebraicExpression<Fp, Fq>>>,
    ),
    Exp(Rc<RefCell<AlgebraicExpression<Fp, Fq>>>, isize),
}

impl<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>> AlgebraicExpression<Fp, Fq> {
    pub fn pow(&self, exp: usize) -> Self {
        Self::Exp(Rc::new(RefCell::new(self.clone())), exp.try_into().unwrap())
    }

    /// Calculates an upper bound on the degree in X.
    /// Output is of the form `(numerator_degree, denominator_degree)`
    pub fn degree(&self, trace_degree: usize) -> (usize, usize) {
        self.degree_impl(1, trace_degree)
    }

    // Copied from https://github.com/0xProject/OpenZKP
    fn degree_impl(&self, x_degree: usize, trace_degree: usize) -> (usize, usize) {
        use AlgebraicExpression::*;
        match self {
            X => (x_degree, 0),
            Hint(_) | Challenge(_) | Constant(_) => (0, 0),
            Trace(..) => (trace_degree, 0),
            Add(a, b) => {
                let (a_numerator, a_denominator) = a.borrow().degree_impl(x_degree, trace_degree);
                let (b_numerator, b_denominator) = b.borrow().degree_impl(x_degree, trace_degree);
                (
                    core::cmp::max(a_numerator + b_denominator, b_numerator + a_denominator),
                    a_denominator + b_denominator,
                )
            }
            Neg(a) => a.borrow().degree_impl(x_degree, trace_degree),
            Mul(a, b) => {
                let (an, ad) = a.borrow().degree_impl(x_degree, trace_degree);
                let (bn, bd) = b.borrow().degree_impl(x_degree, trace_degree);
                (an + bn, ad + bd)
            }
            Exp(a, e) => {
                let (n, d) = a.borrow().degree_impl(x_degree, trace_degree);
                if *e >= 0 {
                    (*e as usize * n, *e as usize * d)
                } else {
                    (isize::abs(*e) as usize * d, isize::abs(*e) as usize * n)
                }
            }

            // lde degrees can't be determined
            // TODO: could keep track of lde degree in type
            #[cfg(feature = "gpu")]
            Lde(..) => panic!(),
        }
    }

    // Copied from https://github.com/0xProject/OpenZKP
    /// Applies a mapped bottom-up traversal.
    /// The function applies to each node after application to its descendants
    pub fn map(&self, f: &mut impl FnMut(Self) -> Self) -> Self {
        use AlgebraicExpression::*;
        // TODO: why can't the copiler do this as a param
        let result = match self {
            // Tree types are recursed first
            Add(a, b) => Add(
                Rc::new(RefCell::new(a.borrow().map(f))),
                Rc::new(RefCell::new(b.borrow().map(f))),
            ),
            Neg(a) => Neg(Rc::new(RefCell::new(a.borrow().map(f)))),
            Mul(a, b) => Mul(
                Rc::new(RefCell::new(a.borrow().map(f))),
                Rc::new(RefCell::new(b.borrow().map(f))),
            ),
            Exp(a, e) => Exp(Rc::new(RefCell::new(a.borrow().map(f))), *e),

            // Leaf types are mapped as is.
            other => other.clone(),
        };

        f(result)
    }

    // Copied from https://github.com/0xProject/OpenZKP
    /// Applies a bottom-up traversal.
    pub fn traverse(&self, f: &mut impl FnMut(&Self)) {
        use AlgebraicExpression::*;
        match self {
            // Tree types are recursed first
            Add(a, b) | Mul(a, b) => {
                a.borrow().traverse(f);
                b.borrow().traverse(f);
            }
            // Neg(a) | Inv(a) | Exp(a, _) => a.traverse(f),
            Neg(a) | Exp(a, _) => a.borrow().traverse(f),
            _ => {}
        }

        f(self)
    }

    /// Applies a bottom-up traversal.
    /// The closure is given mutable access to the nodes.
    pub fn traverse_mut(&mut self, f: &mut impl FnMut(&mut Self)) {
        use AlgebraicExpression::*;
        match self {
            // Tree types are recursed first
            Add(a, b) | Mul(a, b) => {
                a.borrow_mut().traverse_mut(f);
                b.borrow_mut().traverse_mut(f);
            }
            // Neg(a) | Inv(a) | Exp(a, _) => a.traverse(f),
            Neg(a) | Exp(a, _) => a.borrow_mut().traverse_mut(f),
            _ => {}
        }

        f(self)
    }

    // Adapted from https://github.com/0xProject/OpenZKP
    pub fn trace_arguments(&self) -> BTreeSet<(usize, isize)> {
        use AlgebraicExpression::*;
        let mut arguments = BTreeSet::new();
        self.traverse(&mut |node| match node {
            &Trace(i, j) => {
                arguments.insert((i, j));
            }
            #[cfg(feature = "gpu")]
            Lde(..) => panic!(),
            _ => (),
        });
        arguments
    }

    // Copied from https://github.com/0xProject/OpenZKP
    pub fn eval(
        &self,
        x: &FieldConstant<Fp, Fq>,
        hint: &impl Fn(usize) -> FieldConstant<Fp, Fq>,
        challenge: &impl Fn(usize) -> FieldConstant<Fp, Fq>,
        trace: &impl Fn(usize, isize) -> FieldConstant<Fp, Fq>,
    ) -> FieldConstant<Fp, Fq> {
        use AlgebraicExpression::*;
        match self {
            X => *x,
            &Constant(c) => c,
            &Challenge(i) => challenge(i),
            &Hint(i) => hint(i),
            &Trace(i, j) => trace(i, j),
            Add(a, b) => {
                a.borrow().eval(x, hint, challenge, trace)
                    + b.borrow().eval(x, hint, challenge, trace)
            }
            Neg(a) => -a.borrow().eval(x, hint, challenge, trace),
            Mul(a, b) => {
                a.borrow().eval(x, hint, challenge, trace)
                    * b.borrow().eval(x, hint, challenge, trace)
            }
            Exp(a, e) => {
                let eval = a
                    .borrow()
                    .eval(x, hint, challenge, trace)
                    .pow([e.unsigned_abs() as u64]);
                if *e >= 0 {
                    eval
                } else {
                    eval.inverse().unwrap()
                }
            }
            // TODO: clean this up
            #[cfg(feature = "gpu")]
            Lde(..) => panic!(),
        }
    }

    // TODO: docs. Also hash? or signature?
    // TODO: Fq since bigger field but may use Fp
    pub fn evaluation_hash(&self, x: Fq) -> Fq {
        let mut x_bytes = Vec::new();
        x.serialize_compressed(&mut x_bytes).unwrap();

        let hint = |i: usize| {
            let mut hasher = Sha256::new();
            hasher.update(&x_bytes);
            hasher.update("hint");
            hasher.update(i.to_ne_bytes());
            // TODO: use Fq::from_random_bytes. Deserialization failing for large fields
            FieldConstant::Fq(from_bytes::<Fq>(&hasher.finalize()))
        };

        let challenge = |i: usize| {
            let mut hasher = Sha256::new();
            hasher.update(&x_bytes);
            hasher.update("challenge");
            hasher.update(i.to_ne_bytes());
            // TODO: use Fq::from_random_bytes. Deserialization failing for large fields
            FieldConstant::Fq(from_bytes::<Fq>(&hasher.finalize()))
        };

        let trace = |column: usize, offset: isize| {
            let mut hasher = Sha256::new();
            hasher.update(&x_bytes);
            hasher.update("trace");
            hasher.update(column.to_ne_bytes());
            hasher.update(offset.to_ne_bytes());
            // TODO: use Fq::from_random_bytes. Deserialization failing for large fields
            FieldConstant::Fq(from_bytes::<Fq>(&hasher.finalize()))
        };

        self.eval(&FieldConstant::Fq(x), &hint, &challenge, &trace)
            .as_fq()
    }

    /// Returns the evaluation result if the numerator is 0 when the denominator
    /// is 0 otherwise returns None. This can be used as a heuristic check by
    /// the prover to ensure they have a valid execution trace.
    pub fn check(
        &self,
        x: &FieldConstant<Fp, Fq>,
        hint: &impl Fn(usize) -> FieldConstant<Fp, Fq>,
        challenge: &impl Fn(usize) -> FieldConstant<Fp, Fq>,
        trace: &impl Fn(usize, isize) -> FieldConstant<Fp, Fq>,
    ) -> Option<FieldConstant<Fp, Fq>> {
        use AlgebraicExpression::*;
        match self {
            X => Some(*x),
            &Constant(c) => Some(c),
            &Challenge(i) => Some(challenge(i)),
            &Hint(i) => Some(hint(i)),
            &Trace(i, j) => Some(trace(i, j)),
            Add(a, b) => {
                let a = a.borrow().check(x, hint, challenge, trace);
                let b = b.borrow().check(x, hint, challenge, trace);
                if let Some(a) = a && let Some(b) = b {
                    Some(a + b)
                } else {
                    None
                }
            }
            Neg(a) => a.borrow().check(x, hint, challenge, trace).map(|a| -a),
            Mul(a, b) => {
                let a = a.borrow().check(x, hint, challenge, trace);
                let b = b.borrow().check(x, hint, challenge, trace);
                match (a, b) {
                    (Some(a), Some(b)) => Some(a * b),
                    (Some(x), None) | (None, Some(x)) => x.is_zero().then_some(x),
                    (None, None) => None,
                }
            }
            Exp(a, e) => {
                let a = a.borrow().check(x, hint, challenge, trace);
                a.and_then(|a| {
                    let res = a.pow([e.abs() as u64]);
                    if *e < 0 {
                        res.inverse()
                    } else {
                        Some(res)
                    }
                })
            }
            // TODO: clean this up
            #[cfg(feature = "gpu")]
            Lde(..) => panic!(),
        }
    }

    /// TODO: improve the explanation: reuses shared nodes. determines node
    /// equality probabilistically using a kind of evaluation hash
    /// Inspired by Thorkil Værge's "Reusing Shared Nodes" article:
    /// https://neptune.cash/learn/speed-up-stark-provers-with-multicircuits/
    pub fn reuse_shared_nodes(&self) -> Self {
        use AlgebraicExpression::*;
        use rand_seeder::Seeder;
        use rand_pcg::Pcg64;
        // let mut rng = rand::thread_rng();
        let mut rng: Pcg64 = Seeder::from("replace this text with on-chain entropy i.e. block timestamps & hashes").make_rng(); 
        // random evaluation point
        let x = Fq::rand(&mut rng);

        // build graph in O(n)
        let mut visited = BTreeMap::new();
        let Constant(root_hash) = self.map(&mut |node| {
            let evaluation_hash = node.evaluation_hash(x);

            // can't use entry with `or_insert_with` with because `visited` is borrowed inside
            #[allow(clippy::map_entry)]
            if !visited.contains_key(&evaluation_hash) {
                visited.insert(evaluation_hash, match node {
                    // TODO: `Rc` keyword like `box` keyword would be cool
                    // Add(Rc Constant(a), Rc Constant(b)) => ...
                    Add(a, b) => if let (Constant(a), Constant(b)) = (&*a.borrow(), &*b.borrow()) {
                        let a = Rc::clone(visited.get(&a.as_fq()).unwrap());
                        let b = Rc::clone(visited.get(&b.as_fq()).unwrap());
                        Rc::new(RefCell::new(Add(a, b)))
                    } else {
                        unreachable!()
                    },

                    // TODO: consider replacing items in node map if there is a more optimal representation
                    Mul(a, b) => if let (Constant(a), Constant(b)) = (&*a.borrow(), &*b.borrow()) {
                        let a = Rc::clone(visited.get(&a.as_fq()).unwrap());
                        let b = Rc::clone(visited.get(&b.as_fq()).unwrap());
                        Rc::new(RefCell::new(Mul(a, b)))
                    } else {
                        unreachable!()
                    },

                    Exp(a, e) => if let Constant(a) = &*a.borrow() {
                        let a = Rc::clone(visited.get(&a.as_fq()).unwrap());
                        Rc::new(RefCell::new(Exp(a, e)))
                    } else {
                        unreachable!()
                    },

                    Neg(a) => if let Constant(a) = &*a.borrow() {
                        let a = Rc::clone(visited.get(&a.as_fq()).unwrap());
                        Rc::new(RefCell::new(Neg(a)))
                    } else {
                        unreachable!()
                    },

                    // Add leaf nodes to the tree
                    other => Rc::new(RefCell::new(other))
                });
            }

            Constant(FieldConstant::Fq(evaluation_hash))
        }) else {
            unreachable!()
        };

        // TODO: better way of doing this? seems pretty convoluted
        // TODO: debug assertion to compare new evaluation point?
        visited
            .into_iter()
            .find_map(|(k, v)| (k == root_hash.as_fq()).then(|| Rc::try_unwrap(v).ok()))
            .flatten()
            .unwrap()
            .into_inner()
    }
}

impl<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>> Display for AlgebraicExpression<Fp, Fq> {
    fn fmt(&self, f: &mut core::fmt::Formatter<'_>) -> core::fmt::Result {
        use AlgebraicExpression::*;
        match self {
            X => write!(f, "x"),
            Constant(c) => write!(f, "{c}"),
            Challenge(i) => write!(f, "challenge[{i}]"),
            Hint(i) => write!(f, "hint[{i}]"),
            Trace(i, j) => write!(f, "Trace({i}, {j})"),
            Add(a, b) => match &*b.borrow() {
                Neg(b) => write!(f, "({} - {})", a.borrow(), b.borrow()),
                other => write!(f, "({} + {})", a.borrow(), other),
            },
            Neg(a) => write!(f, "-{}", a.borrow()),
            Mul(a, b) => write!(f, "({} * {})", a.borrow(), b.borrow()),
            Exp(a, e) => write!(f, "{}^({})", a.borrow(), e),
            // don't display lde
            #[cfg(feature = "gpu")]
            Lde(..) => unreachable!(),
        }
    }
}

#[allow(clippy::derive_hash_xor_eq)]
impl<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>> Hash for AlgebraicExpression<Fp, Fq> {
    fn hash<H: Hasher>(&self, state: &mut H) {
        use AlgebraicExpression::*;
        match self {
            X => {
                "x".hash(state);
            }
            Constant(c) => {
                c.hash(state);
            }
            Hint(i) => {
                "hint".hash(state);
                i.hash(state);
            }
            Challenge(i) => {
                "challenge".hash(state);
                i.hash(state);
            }
            Trace(i, j) => {
                "trace".hash(state);
                i.hash(state);
                j.hash(state);
            }
            Add(a, b) => {
                "add".hash(state);
                a.borrow().hash(state);
                b.borrow().hash(state);
            }
            Neg(a) => {
                "neg".hash(state);
                a.borrow().hash(state);
            }
            Mul(a, b) => {
                "mul".hash(state);
                a.borrow().hash(state);
                b.borrow().hash(state);
            }
            Exp(a, e) => {
                "exp".hash(state);
                a.borrow().hash(state);
                e.hash(state);
            }
            // LDEs should not be hashed
            // TODO: sort this out
            #[cfg(feature = "gpu")]
            Lde(..) => panic!(),
        }
    }
}

impl<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>> Sum<AlgebraicExpression<Fp, Fq>>
    for AlgebraicExpression<Fp, Fq>
{
    fn sum<I: Iterator<Item = AlgebraicExpression<Fp, Fq>>>(mut iter: I) -> Self {
        use AlgebraicExpression::Constant;
        iter.next()
            .map_or(Constant(FieldConstant::Fp(Fp::zero())), |expr| {
                iter.fold(expr, |a, b| a + b)
            })
    }
}

impl<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>> Product<AlgebraicExpression<Fp, Fq>>
    for AlgebraicExpression<Fp, Fq>
{
    fn product<I: Iterator<Item = AlgebraicExpression<Fp, Fq>>>(mut iter: I) -> Self {
        // TODO: zero or one?
        use AlgebraicExpression::Constant;
        iter.next()
            .map_or(Constant(FieldConstant::Fp(Fp::zero())), |expr| {
                iter.fold(expr, |a, b| a * b)
            })
    }
}

impl<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>> Mul<&AlgebraicExpression<Fp, Fq>>
    for &AlgebraicExpression<Fp, Fq>
{
    type Output = AlgebraicExpression<Fp, Fq>;

    fn mul(self, rhs: &AlgebraicExpression<Fp, Fq>) -> Self::Output {
        Mul::mul(self.clone(), rhs.clone())
    }
}

impl<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>> Mul<AlgebraicExpression<Fp, Fq>>
    for AlgebraicExpression<Fp, Fq>
{
    type Output = AlgebraicExpression<Fp, Fq>;

    fn mul(self, rhs: AlgebraicExpression<Fp, Fq>) -> AlgebraicExpression<Fp, Fq> {
        AlgebraicExpression::Mul(Rc::new(RefCell::new(self)), Rc::new(RefCell::new(rhs)))
    }
}

impl<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>> Div<&AlgebraicExpression<Fp, Fq>>
    for &AlgebraicExpression<Fp, Fq>
{
    type Output = AlgebraicExpression<Fp, Fq>;

    fn div(self, rhs: &AlgebraicExpression<Fp, Fq>) -> Self::Output {
        Div::div(self.clone(), rhs.clone())
    }
}

impl<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>> Div<AlgebraicExpression<Fp, Fq>>
    for AlgebraicExpression<Fp, Fq>
{
    type Output = AlgebraicExpression<Fp, Fq>;

    #[allow(clippy::suspicious_arithmetic_impl)]
    fn div(self, rhs: AlgebraicExpression<Fp, Fq>) -> AlgebraicExpression<Fp, Fq> {
        // self * AlgebraicExpression::Inv(Box::new(rhs))
        self * AlgebraicExpression::Exp(Rc::new(RefCell::new(rhs)), -1)
    }
}

impl<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>> Add<&AlgebraicExpression<Fp, Fq>>
    for &AlgebraicExpression<Fp, Fq>
{
    type Output = AlgebraicExpression<Fp, Fq>;

    fn add(self, rhs: &AlgebraicExpression<Fp, Fq>) -> Self::Output {
        Add::add(self.clone(), rhs.clone())
    }
}

impl<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>> Add<AlgebraicExpression<Fp, Fq>>
    for AlgebraicExpression<Fp, Fq>
{
    type Output = AlgebraicExpression<Fp, Fq>;

    fn add(self, rhs: AlgebraicExpression<Fp, Fq>) -> AlgebraicExpression<Fp, Fq> {
        AlgebraicExpression::Add(Rc::new(RefCell::new(self)), Rc::new(RefCell::new(rhs)))
    }
}

impl<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>> Sub<&AlgebraicExpression<Fp, Fq>>
    for &AlgebraicExpression<Fp, Fq>
{
    type Output = AlgebraicExpression<Fp, Fq>;

    fn sub(self, rhs: &AlgebraicExpression<Fp, Fq>) -> Self::Output {
        Sub::sub(self.clone(), rhs.clone())
    }
}

impl<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>> Sub<AlgebraicExpression<Fp, Fq>>
    for AlgebraicExpression<Fp, Fq>
{
    type Output = AlgebraicExpression<Fp, Fq>;

    #[allow(clippy::suspicious_arithmetic_impl)]
    fn sub(self, rhs: AlgebraicExpression<Fp, Fq>) -> AlgebraicExpression<Fp, Fq> {
        self + rhs.neg()
    }
}

impl<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>> Neg for AlgebraicExpression<Fp, Fq> {
    type Output = AlgebraicExpression<Fp, Fq>;

    fn neg(self) -> Self::Output {
        AlgebraicExpression::Neg(Rc::new(RefCell::new(self)))
    }
}

impl<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>> Neg for &AlgebraicExpression<Fp, Fq> {
    type Output = AlgebraicExpression<Fp, Fq>;

    #[inline]
    fn neg(self) -> Self::Output {
        self.clone().neg()
    }
}

impl<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>> Mul<FieldConstant<Fp, Fq>>
    for AlgebraicExpression<Fp, Fq>
{
    type Output = AlgebraicExpression<Fp, Fq>;

    fn mul(self, rhs: FieldConstant<Fp, Fq>) -> Self::Output {
        self * AlgebraicExpression::Constant(rhs)
    }
}

impl<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>> Mul<&FieldConstant<Fp, Fq>>
    for &AlgebraicExpression<Fp, Fq>
{
    type Output = AlgebraicExpression<Fp, Fq>;

    fn mul(self, rhs: &FieldConstant<Fp, Fq>) -> Self::Output {
        self.clone() * AlgebraicExpression::Constant(*rhs)
    }
}

impl<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>> Div<FieldConstant<Fp, Fq>>
    for AlgebraicExpression<Fp, Fq>
{
    type Output = AlgebraicExpression<Fp, Fq>;

    #[allow(clippy::suspicious_arithmetic_impl)]
    fn div(self, rhs: FieldConstant<Fp, Fq>) -> Self::Output {
        self * AlgebraicExpression::Constant(rhs.inverse().unwrap())
    }
}

impl<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>> Div<&FieldConstant<Fp, Fq>>
    for &AlgebraicExpression<Fp, Fq>
{
    type Output = AlgebraicExpression<Fp, Fq>;

    #[allow(clippy::suspicious_arithmetic_impl)]
    fn div(self, rhs: &FieldConstant<Fp, Fq>) -> Self::Output {
        self.clone() * AlgebraicExpression::Constant(rhs.inverse().unwrap())
    }
}

impl<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>> Add<FieldConstant<Fp, Fq>>
    for AlgebraicExpression<Fp, Fq>
{
    type Output = AlgebraicExpression<Fp, Fq>;

    fn add(self, rhs: FieldConstant<Fp, Fq>) -> Self::Output {
        self + AlgebraicExpression::Constant(rhs)
    }
}

impl<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>> Add<&FieldConstant<Fp, Fq>>
    for &AlgebraicExpression<Fp, Fq>
{
    type Output = AlgebraicExpression<Fp, Fq>;

    fn add(self, rhs: &FieldConstant<Fp, Fq>) -> Self::Output {
        self.clone() + AlgebraicExpression::Constant(*rhs)
    }
}

impl<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>> Sub<FieldConstant<Fp, Fq>>
    for AlgebraicExpression<Fp, Fq>
{
    type Output = AlgebraicExpression<Fp, Fq>;

    fn sub(self, rhs: FieldConstant<Fp, Fq>) -> Self::Output {
        self + AlgebraicExpression::Constant(-rhs)
    }
}

impl<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>> Sub<&FieldConstant<Fp, Fq>>
    for &AlgebraicExpression<Fp, Fq>
{
    type Output = AlgebraicExpression<Fp, Fq>;

    fn sub(self, rhs: &FieldConstant<Fp, Fq>) -> Self::Output {
        self.clone() + AlgebraicExpression::Constant(-*rhs)
    }
}

forward_ref_binop!(impl< Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp> > Mul, mul for AlgebraicExpression<Fp, Fq>, AlgebraicExpression<Fp, Fq>);
forward_ref_binop!(impl< Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp> > Div, div for AlgebraicExpression<Fp, Fq>, AlgebraicExpression<Fp, Fq>);
forward_ref_binop!(impl< Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp> > Add, add for AlgebraicExpression<Fp, Fq>, AlgebraicExpression<Fp, Fq>);
forward_ref_binop!(impl< Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp> > Sub, sub for AlgebraicExpression<Fp, Fq>, AlgebraicExpression<Fp, Fq>);
forward_ref_binop!(impl< Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp> > Mul, mul for AlgebraicExpression<Fp, Fq>, FieldConstant<Fp, Fq>);
forward_ref_binop!(impl< Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp> > Div, div for AlgebraicExpression<Fp, Fq>, FieldConstant<Fp, Fq>);
forward_ref_binop!(impl< Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp> > Add, add for AlgebraicExpression<Fp, Fq>, FieldConstant<Fp, Fq>);
forward_ref_binop!(impl< Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp> > Sub, sub for AlgebraicExpression<Fp, Fq>, FieldConstant<Fp, Fq>);

impl<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>> MulAssign<AlgebraicExpression<Fp, Fq>>
    for AlgebraicExpression<Fp, Fq>
{
    fn mul_assign(&mut self, other: AlgebraicExpression<Fp, Fq>) {
        *self = &*self * other
    }
}

impl<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>> MulAssign<FieldConstant<Fp, Fq>>
    for AlgebraicExpression<Fp, Fq>
{
    fn mul_assign(&mut self, rhs: FieldConstant<Fp, Fq>) {
        *self = &*self * rhs
    }
}

impl<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>> DivAssign<AlgebraicExpression<Fp, Fq>>
    for AlgebraicExpression<Fp, Fq>
{
    fn div_assign(&mut self, other: AlgebraicExpression<Fp, Fq>) {
        *self = &*self / other
    }
}

impl<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>> DivAssign<FieldConstant<Fp, Fq>>
    for AlgebraicExpression<Fp, Fq>
{
    fn div_assign(&mut self, rhs: FieldConstant<Fp, Fq>) {
        *self = &*self / rhs
    }
}

impl<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>> AddAssign<AlgebraicExpression<Fp, Fq>>
    for AlgebraicExpression<Fp, Fq>
{
    fn add_assign(&mut self, other: AlgebraicExpression<Fp, Fq>) {
        *self = &*self + other
    }
}

impl<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>> AddAssign<FieldConstant<Fp, Fq>>
    for AlgebraicExpression<Fp, Fq>
{
    fn add_assign(&mut self, rhs: FieldConstant<Fp, Fq>) {
        *self = &*self + rhs
    }
}

impl<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>> SubAssign<AlgebraicExpression<Fp, Fq>>
    for AlgebraicExpression<Fp, Fq>
{
    fn sub_assign(&mut self, other: AlgebraicExpression<Fp, Fq>) {
        *self = &*self - other
    }
}

impl<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>> SubAssign<FieldConstant<Fp, Fq>>
    for AlgebraicExpression<Fp, Fq>
{
    fn sub_assign(&mut self, rhs: FieldConstant<Fp, Fq>) {
        *self = &*self - rhs
    }
}

forward_ref_op_assign!(impl< Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp> > MulAssign, mul_assign for AlgebraicExpression<Fp, Fq>, AlgebraicExpression<Fp, Fq>);
forward_ref_op_assign!(impl< Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp> > DivAssign, div_assign for AlgebraicExpression<Fp, Fq>, AlgebraicExpression<Fp, Fq>);
forward_ref_op_assign!(impl< Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp> > AddAssign, add_assign for AlgebraicExpression<Fp, Fq>, AlgebraicExpression<Fp, Fq>);
forward_ref_op_assign!(impl< Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp> > SubAssign, sub_assign for AlgebraicExpression<Fp, Fq>, AlgebraicExpression<Fp, Fq>);
forward_ref_op_assign!(impl< Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp> > MulAssign, mul_assign for AlgebraicExpression<Fp, Fq>, FieldConstant<Fp, Fq>);
forward_ref_op_assign!(impl< Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp> > DivAssign, div_assign for AlgebraicExpression<Fp, Fq>, FieldConstant<Fp, Fq>);
forward_ref_op_assign!(impl< Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp> > AddAssign, add_assign for AlgebraicExpression<Fp, Fq>, FieldConstant<Fp, Fq>);
forward_ref_op_assign!(impl< Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp> > SubAssign, sub_assign for AlgebraicExpression<Fp, Fq>, FieldConstant<Fp, Fq>);
