use ark_ff::Field;
use ark_ff::One;
use ark_ff::PrimeField;
use digest::ExtendableOutput;
use digest::Update;
use digest::XofReader;
use num_bigint::BigInt;
use num_bigint::BigUint;
use num_integer::ExtendedGcd;
use num_integer::Integer;
use sha3::Shake256;

pub struct Rescue<F: PrimeField> {
    alpha: F::BigInt,
    alpha_inv: F::BigInt,
    state_width: usize, /* =m */
    rounds: usize,      /* =N */
    capacity: usize,
    digest_size: usize,
    round_constants: Vec<F>,
    mds: Vec<Vec<F>>,
    input: Vec<F>,
}

impl<F: PrimeField> Rescue<F> {
    pub fn new(
        state_width: usize,
        capacity: usize,
        rounds: usize,
        security_level: usize,
        digest_size: usize,
    ) -> Self {
        let round_constants = Self::round_constants(state_width, capacity, rounds, security_level);
        let mds = Self::mds_matrix(state_width);
        let (alpha, alpha_inv) = Self::get_alphas();
        Rescue {
            alpha,
            alpha_inv,
            state_width,
            rounds,
            capacity,
            digest_size,
            round_constants,
            mds,
            input: Vec::new(),
        }
    }

    pub fn update(&mut self, input: F) {
        self.input.push(input)
    }

    #[allow(clippy::needless_range_loop)]
    pub fn finish(&self) -> Vec<F> {
        let rate = self.state_width - self.capacity;
        let mut input = self.input.clone();

        // apply padding
        input.push(F::one());
        while input.len() % rate != 0 {
            input.push(F::zero());
        }

        // initialize state to all zeros
        let mut state = vec![vec![F::zero(); 1]; self.state_width];

        // absorbing
        let mut absorb_index = 0;
        while absorb_index < input.len() {
            for i in 0..rate {
                state[i][0] += input[absorb_index];
                absorb_index += 1;
            }
            self.permute(&mut state);
        }

        // squeezing
        let mut output_sequence = Vec::new();
        let mut squeeze_index = 0;
        while squeeze_index < self.digest_size {
            for i in 0..rate {
                output_sequence.push(state[i][0]);
                squeeze_index += 1;
            }

            if squeeze_index < self.digest_size {
                self.permute(&mut state);
            }
        }

        while output_sequence.len() > self.digest_size {
            output_sequence.pop();
        }

        assert_eq!(self.digest_size, output_sequence.len());
        output_sequence
    }

    #[allow(clippy::needless_range_loop)]
    fn permute(&self, state: &mut Vec<Vec<F>>) {
        for i in 0..self.rounds {
            // S-box
            for j in 0..self.state_width {
                state[j][0] = state[j][0].pow(self.alpha);
            }

            // MDS
            *state = matrix_mul(&self.mds, state);

            // constants
            for j in 0..self.state_width {
                state[j][0] += self.round_constants[i * 2 * self.state_width + j];
            }

            // inverse S-box
            for j in 0..self.state_width {
                state[j][0] = state[j][0].pow(self.alpha_inv);
            }

            // MDS
            *state = matrix_mul(&self.mds, state);

            // constants
            for j in 0..self.state_width {
                state[j][0] +=
                    self.round_constants[i * 2 * self.state_width + self.state_width + j];
            }
        }
    }

    /// Generates the round constants
    fn round_constants(
        state_width: usize,
        capacity: usize,
        rounds: usize,
        security_level: usize,
    ) -> Vec<F> {
        let modulus = F::MODULUS;
        let seed = format!("Rescue-XLIX({modulus},{state_width},{capacity},{security_level})");

        let mut hasher = Shake256::default();
        hasher.update(seed.as_bytes());
        let mut reader = hasher.finalize_xof();

        let bytes_per_int = F::MODULUS_BIT_SIZE.next_multiple_of(8) / 8 + 1;
        let mut round_constants = vec![F::ZERO; 2 * state_width * rounds];
        for round_constant in round_constants.iter_mut() {
            let mut chunk = vec![0u8; bytes_per_int as usize];
            reader.read(&mut chunk);

            let mut power = F::one();
            let mut acc = F::zero();
            for byte in chunk {
                acc += power * F::from(byte);
                power *= F::from(256u32);
            }

            *round_constant = acc;
        }

        round_constants
    }

    /// Generates the maximum distance separable (MDS) matrix
    /// Algorithm 4: https://eprint.iacr.org/2020/1143.pdf
    fn mds_matrix(state_width: usize) -> Vec<Vec<F>> {
        let num_rows = state_width;
        let num_cols = 2 * state_width;

        let mut generator_matrix = vec![vec![F::zero(); num_cols]; num_rows];
        for (i, row) in generator_matrix.iter_mut().enumerate() {
            for (j, v) in row.iter_mut().enumerate() {
                *v = F::GENERATOR.pow([(i * j) as u64]);
            }
        }

        // the MDS matrix is the transpose of the right half of the generator matrix
        let mut generator_matrix_ech = echelon_form(&generator_matrix);
        generator_matrix_ech
            .iter_mut()
            .for_each(|r| *r = r.split_off(num_cols - num_rows));
        transpose(&generator_matrix_ech)
    }

    /// Outputs the alphas in the form `(alpha, alpha_inv)`
    /// Algorithm 6 Computing α and α^(-1)
    fn get_alphas() -> (F::BigInt, F::BigInt) {
        let p = BigInt::from(F::MODULUS.into());
        let p_sub_one = p.clone() - BigInt::one();
        let mut alpha = BigInt::from(3u32);

        while alpha <= p_sub_one {
            println!("Alpha: {}", alpha);
            println!("Alpha inv: {}", p_sub_one);
            let ExtendedGcd {
                gcd, x: alpha_inv, ..
            } = BigInt::extended_gcd(&alpha, &p_sub_one);

            if gcd.is_one() {
                return (
                    BigUint::try_from(alpha).unwrap().try_into().unwrap(),
                    BigUint::try_from(alpha_inv.modpow(&BigInt::one(), &p))
                        .unwrap()
                        .try_into()
                        .unwrap(),
                );
            }

            alpha += BigInt::one()
        }

        panic!("could not generate alphas");
    }
}

/// Computes the Reduced Row Echelon Form
/// Computed by Gauss–Jordan elimination
/// https://en.wikipedia.org/wiki/Row_echelon_form
fn echelon_form<T: Field>(m: &Vec<Vec<T>>) -> Vec<Vec<T>> {
    if m.is_empty() || m[0].is_empty() {
        return Vec::new();
    }

    let num_rows = m.len();
    let num_cols = m[0].len();

    let mut lead = 0;
    let mut m = m.clone();

    for r in 0..num_rows {
        if num_cols <= lead {
            return m;
        }

        // Find the pivot
        let mut i = r;
        while m[i][lead].is_zero() {
            i += 1;
            if i == num_rows {
                i = r;
                lead += 1;

                if lead == num_cols {
                    return m;
                }
            }
        }

        if i != r {
            m.swap(i, r);
        }

        let pivot = m[r][lead];
        m[r].iter_mut().for_each(|v| *v /= pivot);

        for i in 0..num_rows {
            if i != r {
                let pivot = m[i][lead];
                for j in lead..num_cols {
                    m[i][j] = pivot * m[r][j];
                }
            }
        }

        lead += 1;
    }

    m
}

/// Transposes a matrix
fn transpose<T: Clone + Copy + Default>(m: &Vec<Vec<T>>) -> Vec<Vec<T>> {
    if m.is_empty() || m[0].is_empty() {
        return Vec::new();
    }

    let num_rows = m.len();
    let num_cols = m[0].len();

    let mut res = vec![vec![T::default(); num_rows]; num_cols];

    for (r, row) in m.iter().enumerate() {
        for (c, val) in row.iter().enumerate() {
            res[c][r] = *val;
        }
    }

    res
}

// Multiplies two row major matrices
#[allow(clippy::needless_range_loop)]
fn matrix_mul<F: PrimeField>(a: &Vec<Vec<F>>, b: &Vec<Vec<F>>) -> Vec<Vec<F>> {
    if a.is_empty() || a[0].is_empty() || b.is_empty() || b[0].is_empty() {
        return Vec::new();
    }

    debug_assert_eq!(a[0].len(), b.len());
    let mut res = vec![vec![F::zero(); b[0].len()]; a.len()];

    // iterate rows of `a`
    for i in 0..a.len() {
        // iterate columns of `b`
        for j in 0..b[0].len() {
            // iterate rows of `b`
            for k in 0..b.len() {
                res[i][j] += a[i][k] * b[k][j];
            }
        }
    }

    res
}
