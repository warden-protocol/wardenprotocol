use crate::constraints::Hint;
use alloc::vec::Vec;
use ark_ff::Field;
use core::ops::Deref;
use core::ops::Index;

#[derive(Default)]
pub struct Hints<F: Field>(Vec<F>);

impl<F: Field> Hints<F> {
    pub fn new(mut hints: Vec<(usize, F)>) -> Self {
        hints.sort();
        for [(a, _), (b, _)] in hints.array_windows() {
            assert!(a != b, "multiple hints exist at index {a}");
        }
        for (expected, (actual, _)) in (0..hints.len()).zip(&hints) {
            assert!(expected == *actual, "missing hint at index {expected}")
        }
        Hints(hints.into_iter().map(|(_, value)| value).collect())
    }
}

impl<F: Field> Deref for Hints<F> {
    type Target = Vec<F>;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl<F: Field, H: Hint> Index<H> for Hints<F> {
    type Output = F;

    fn index(&self, hint: H) -> &Self::Output {
        &self.0[hint.index()]
    }
}
