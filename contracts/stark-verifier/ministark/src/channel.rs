use crate::fri;
use crate::fri::FriProof;
use crate::random::PublicCoin;
use crate::trace::Queries;
use crate::Air;
use crate::Proof;
use alloc::vec::Vec;
use ark_serialize::CanonicalSerialize;
use ark_std::rand::Rng;
use core::ops::Deref;
use digest::Digest;
use digest::Output;
#[cfg(feature = "parallel")]
use rayon::prelude::*;

pub struct ProverChannel<'a, A: Air, D: Digest> {
    air: &'a A,
    pub public_coin: PublicCoin<D>,
    base_trace_commitment: Output<D>,
    extension_trace_commitment: Option<Output<D>>,
    composition_trace_commitment: Output<D>,
    fri_layer_commitments: Vec<Output<D>>,
    execution_trace_ood_evals: Vec<A::Fq>,
    composition_trace_ood_evals: Vec<A::Fq>,
    pow_nonce: u64,
}

// impl<'a, A: Air, D: Digest> ProverChannel<'a, A, D> {
impl<'a, A: Air, D: Digest> ProverChannel<'a, A, D> {
    pub fn new(air: &'a A) -> Self {
        let mut seed = Vec::new();
        // Seed the public coin with:
        // 1. serialized public imputs
        air.pub_inputs().serialize_compressed(&mut seed).unwrap();
        // 2. various metadata about the air and proof
        // TODO: field bytes?
        air.trace_info().serialize_compressed(&mut seed).unwrap();
        air.options().serialize_compressed(&mut seed).unwrap();
        let public_coin = PublicCoin::<D>::new(&seed);
        ProverChannel {
            air,
            public_coin,
            extension_trace_commitment: None,
            base_trace_commitment: Default::default(),
            composition_trace_commitment: Default::default(),
            execution_trace_ood_evals: Default::default(),
            composition_trace_ood_evals: Default::default(),
            fri_layer_commitments: Default::default(),
            pow_nonce: 0,
        }
    }

    pub fn commit_base_trace(&mut self, commitment: &Output<D>) {
        self.public_coin.reseed(&commitment.deref());
        self.base_trace_commitment = commitment.clone();
    }

    pub fn commit_extension_trace(&mut self, commitment: &Output<D>) {
        self.public_coin.reseed(&commitment.deref());
        self.extension_trace_commitment = Some(commitment.clone());
    }

    pub fn commit_composition_trace(&mut self, commitment: &Output<D>) {
        self.public_coin.reseed(&commitment.deref());
        self.composition_trace_commitment = commitment.clone();
    }

    pub fn get_ood_point<F: ark_ff::Field>(&mut self) -> F {
        self.public_coin.draw()
    }

    pub fn send_execution_trace_ood_evals(&mut self, evals: Vec<A::Fq>) {
        self.public_coin.reseed(&evals);
        self.execution_trace_ood_evals = evals;
    }

    pub fn send_composition_trace_ood_evals(&mut self, evals: Vec<A::Fq>) {
        self.public_coin.reseed(&evals);
        self.composition_trace_ood_evals = evals;
    }

    pub fn grind_fri_commitments(&mut self) {
        let grinding_factor = self.air.options().grinding_factor as u32;
        if grinding_factor == 0 {
            // skip if there is no grinding required
            return;
        }

        #[cfg(not(feature = "parallel"))]
        let nonce = (1..u64::MAX)
            .find(|&nonce| self.public_coin.check_leading_zeros(nonce) >= grinding_factor);

        #[cfg(feature = "parallel")]
        let nonce = (1..u64::MAX)
            .into_par_iter()
            .find_any(|&nonce| self.public_coin.check_leading_zeros(nonce) >= grinding_factor);

        self.pow_nonce = nonce.expect("nonce not found");
        self.public_coin.reseed(&self.pow_nonce);
    }

    pub fn get_fri_query_positions(&mut self) -> Vec<usize> {
        // TODO: voulnerability if multiple positions are the same
        let num_queries = self.air.options().num_queries;
        let lde_domain_size = self.air.trace_len() * self.air.lde_blowup_factor();
        let mut rng = self.public_coin.draw_rng();
        (0..num_queries)
            .map(|_| rng.gen_range(0..lde_domain_size))
            .collect()
    }

    pub fn build_proof(self, trace_queries: Queries<A>, fri_proof: FriProof<A::Fq>) -> Proof<A> {
        Proof {
            options: *self.air.options(),
            trace_info: self.air.trace_info().clone(),
            base_trace_commitment: self.base_trace_commitment.to_vec(),
            extension_trace_commitment: self.extension_trace_commitment.map(|o| o.to_vec()),
            composition_trace_commitment: self.composition_trace_commitment.to_vec(),
            public_inputs: self.air.pub_inputs().clone(),
            execution_trace_ood_evals: self.execution_trace_ood_evals,
            composition_trace_ood_evals: self.composition_trace_ood_evals,
            pow_nonce: self.pow_nonce,
            fri_proof,
            trace_queries,
        }
    }
}

// FRI prover channel implementation
impl<'a, A: Air, D: Digest> fri::ProverChannel<A::Fq> for ProverChannel<'a, A, D> {
    type Digest = D;

    fn commit_fri_layer(&mut self, commitment: &Output<D>) {
        self.public_coin.reseed(&commitment.deref());
        self.fri_layer_commitments.push(commitment.clone());
    }

    fn draw_fri_alpha(&mut self) -> A::Fq {
        self.public_coin.draw()
    }
}
