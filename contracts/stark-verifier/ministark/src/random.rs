use alloc::vec::Vec;
use ark_ff::Field;
use ark_serialize::CanonicalSerialize;
use digest::Digest;
use digest::Output;
use rand_chacha::rand_core::SeedableRng;
use rand_chacha::ChaCha20Rng;

// TODO: refactor public coin/channel stuff
pub struct PublicCoin<D: Digest> {
    pub seed: Output<D>,
    counter: usize,
}

impl<D: Digest> PublicCoin<D> {
    pub fn new(seed: &[u8]) -> Self {
        PublicCoin {
            seed: D::new_with_prefix(seed).finalize(),
            counter: 0,
        }
    }

    pub fn reseed(&mut self, item: &impl CanonicalSerialize) {
        let mut data = Vec::new();
        item.serialize_compressed(&mut data).unwrap();
        let mut hasher = D::new();
        hasher.update(&self.seed);
        hasher.update(data);
        self.seed = hasher.finalize();
        self.counter = 0;
    }

    pub fn seed_leading_zeros(&self) -> u32 {
        leading_zeros(&self.seed)
    }

    pub fn check_leading_zeros(&self, nonce: u64) -> u32 {
        let mut nonce_bytes = Vec::with_capacity(nonce.compressed_size());
        nonce.serialize_compressed(&mut nonce_bytes).unwrap();
        let mut hasher = D::new();
        hasher.update(&self.seed);
        hasher.update(&nonce_bytes);
        leading_zeros(&hasher.finalize())
    }

    pub fn draw<F: Field>(&mut self) -> F {
        F::rand(&mut self.draw_rng())
    }

    // TODO: make this generic
    pub fn draw_rng(&mut self) -> ChaCha20Rng {
        let mut seed: [u8; 32] = Default::default();
        seed.copy_from_slice(&self.next()[0..32]);
        ChaCha20Rng::from_seed(seed)
    }

    /// Updates the state by incrementing the counter and returns hash(seed ||
    /// counter)
    fn next(&mut self) -> Output<D> {
        self.counter += 1;
        let mut hasher = D::new();
        hasher.update(&self.seed);
        hasher.update(self.counter.to_be_bytes());
        hasher.finalize()
    }
}

fn leading_zeros(hash: &[u8]) -> u32 {
    let mut zeros = 0;
    for byte in hash {
        let leading_zeros = byte.leading_zeros();
        zeros += leading_zeros;

        if leading_zeros != 8 {
            break;
        }
    }
    zeros
}
