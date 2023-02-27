use crate::constraints::VerifierChallenge;
use alloc::vec::Vec;
use ark_ff::Field;
use ark_std::rand::Rng;
use core::ops::Deref;
use core::ops::Index;

#[derive(Default)]
pub struct Challenges<F: Field>(Vec<F>);

impl<F: Field> Challenges<F> {
    pub fn new<R: Rng + ?Sized>(rng: &mut R, num_challenges: usize) -> Self {
        Challenges((0..num_challenges).map(|_| F::rand(rng)).collect())
    }
}

impl<F: Field> Deref for Challenges<F> {
    type Target = Vec<F>;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl<F: Field, C: VerifierChallenge> Index<C> for Challenges<F> {
    type Output = F;

    fn index(&self, challenge: C) -> &Self::Output {
        &self.0[challenge.index()]
    }
}
