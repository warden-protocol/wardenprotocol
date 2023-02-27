// Wraps an arkworks field. The wrapper can expose a public API that is
// different from the API of the private arkworks field.
#[macro_export]
macro_rules! wrap_field {
    ($outer:ident; $inner:ty) => {
        #[derive(Default, Clone, Copy, Debug, PartialEq, Eq, Hash, zeroize::Zeroize)]
        pub struct $outer($inner);

        impl core::fmt::Display for $outer {
            fn fmt(&self, f: &mut core::fmt::Formatter<'_>) -> core::fmt::Result {
                write!(f, "{}", self.0)
            }
        }

        // impl ark_ff::UniformRand for $outer {
        //     fn rand<R: rand::Rng + ?Sized>(rng: &mut R) -> Self {
        //         $outer(<$inner>::rand(rng))
        //     }
        // }

        // impl ark_ff::Field for $outer {
        //     type BasePrimeField = <$inner as ark_ff::Field>::BasePrimeField;
        //     type BasePrimeFieldIter = <$inner as ark_ff::Field>::BasePrimeFieldIter;
        //     const SQRT_PRECOMP: Option<ark_ff::SqrtPrecomputation<Self>> =
        //         match <$inner as ark_ff::Field>::SQRT_PRECOMP {
        //             Some(ark_ff::SqrtPrecomputation::TonelliShanks {
        //                 two_adicity,
        //                 quadratic_nonresidue_to_trace,
        //                 trace_of_modulus_minus_one_div_two,
        //             }) => Some(ark_ff::SqrtPrecomputation::TonelliShanks {
        //                 two_adicity,
        //                 quadratic_nonresidue_to_trace: $outer(quadratic_nonresidue_to_trace),
        //                 trace_of_modulus_minus_one_div_two,
        //             }),
        //             Some(ark_ff::SqrtPrecomputation::Case3Mod4 {
        //                 modulus_plus_one_div_four,
        //             }) => Some(ark_ff::SqrtPrecomputation::Case3Mod4 {
        //                 modulus_plus_one_div_four,
        //             }),
        //             None => None,
        //             _ => unreachable!(),
        //         };

        //     const ZERO: Self = $outer(<$inner>::ZERO);
        //     const ONE: Self = $outer(<$inner>::ONE);

        //     fn extension_degree() -> u64 {
        //         <$inner>::extension_degree()
        //     }

        //     fn to_base_prime_field_elements(&self) -> Self::BasePrimeFieldIter {
        //         self.0.to_base_prime_field_elements()
        //     }

        //     fn from_base_prime_field_elems(elems: &[Self::BasePrimeField]) -> Option<Self> {
        //         <$inner>::from_base_prime_field_elems(elems).map($outer)
        //     }

        //     fn from_base_prime_field(elem: Self::BasePrimeField) -> Self {
        //         $outer(<$inner>::from_base_prime_field(elem))
        //     }

        //     fn double(&self) -> Self {
        //         $outer(self.0.double())
        //     }

        //     fn double_in_place(&mut self) -> &mut Self {
        //         self.0.double_in_place();
        //         self
        //     }

        //     fn neg_in_place(&mut self) -> &mut Self {
        //         self.0.neg_in_place();
        //         self
        //     }

        //     fn from_random_bytes_with_flags<F: ark_serialize::Flags>(
        //         bytes: &[u8],
        //     ) -> Option<(Self, F)> {
        //         <$inner>::from_random_bytes_with_flags(bytes)
        //             .map(|(element, flags)| ($outer(element), flags))
        //     }

        //     fn legendre(&self) -> ark_ff::LegendreSymbol {
        //         self.0.legendre()
        //     }

        //     fn square(&self) -> Self {
        //         $outer(self.0.square())
        //     }

        //     fn square_in_place(&mut self) -> &mut Self {
        //         self.0.square_in_place();
        //         self
        //     }

        //     fn inverse(&self) -> Option<Self> {
        //         self.0.inverse().map($outer)
        //     }

        //     fn inverse_in_place(&mut self) -> Option<&mut Self> {
        //         match self.0.inverse_in_place() {
        //             Some(_) => Some(self),
        //             None => None,
        //         }
        //     }

        //     fn frobenius_map(&self, power: usize) -> Self {
        //         $outer(self.0.frobenius_map(power))
        //     }

        //     fn frobenius_map_in_place(&mut self, power: usize) {
        //         self.0.frobenius_map_in_place(power);
        //     }
        // }

        impl Ord for $outer {
            #[inline(always)]
            fn cmp(&self, other: &Self) -> core::cmp::Ordering {
                self.0.cmp(&other.0)
            }
        }

        impl PartialOrd for $outer {
            #[inline(always)]
            fn partial_cmp(&self, other: &Self) -> Option<core::cmp::Ordering> {
                Some(self.cmp(other))
            }
        }

        impl ark_serialize::CanonicalDeserializeWithFlags for $outer {
            fn deserialize_with_flags<R: ark_serialize::Read, F: ark_serialize::Flags>(
                reader: R,
            ) -> Result<(Self, F), ark_serialize::SerializationError> {
                <$inner>::deserialize_with_flags(reader)
                    .map(|(element, flags)| ($outer(element), flags))
            }
        }

        impl ark_serialize::CanonicalSerializeWithFlags for $outer {
            fn serialize_with_flags<W: ark_serialize::Write, F: ark_serialize::Flags>(
                &self,
                writer: W,
                flags: F,
            ) -> Result<(), ark_serialize::SerializationError> {
                self.0.serialize_with_flags(writer, flags)
            }

            fn serialized_size_with_flags<F: ark_serialize::Flags>(&self) -> usize {
                self.0.serialized_size_with_flags::<F>()
            }
        }

        impl ark_serialize::CanonicalSerialize for $outer {
            fn serialize_with_mode<W: ark_serialize::Write>(
                &self,
                writer: W,
                compress: ark_serialize::Compress,
            ) -> Result<(), ark_serialize::SerializationError> {
                self.0.serialize_with_mode(writer, compress)
            }

            fn serialized_size(&self, compress: ark_serialize::Compress) -> usize {
                self.0.serialized_size(compress)
            }
        }

        impl ark_serialize::CanonicalDeserialize for $outer {
            fn deserialize_with_mode<R: ark_serialize::Read>(
                reader: R,
                compress: ark_serialize::Compress,
                validate: ark_serialize::Validate,
            ) -> Result<Self, ark_serialize::SerializationError> {
                <$inner>::deserialize_with_mode(reader, compress, validate).map($outer)
            }
        }

        impl ark_serialize::Valid for $outer {
            fn check(&self) -> Result<(), ark_serialize::SerializationError> {
                self.0.check()
            }
        }

        impl ark_ff::Zero for $outer {
            fn zero() -> Self {
                $outer(<$inner>::zero())
            }

            fn is_zero(&self) -> bool {
                self.0.is_zero()
            }
        }

        impl ark_ff::One for $outer {
            fn one() -> Self {
                $outer(<$inner>::one())
            }
        }

        impl core::ops::Neg for $outer {
            type Output = Self;

            fn neg(self) -> Self::Output {
                $outer(self.0.neg())
            }
        }

        impl core::iter::Product<Self> for $outer {
            fn product<I: Iterator<Item = Self>>(iter: I) -> Self {
                iter.fold(ark_ff::Zero::zero(), core::ops::Mul::mul)
            }
        }

        impl<'a> core::iter::Product<&'a Self> for $outer {
            fn product<I: Iterator<Item = &'a Self>>(iter: I) -> Self {
                iter.fold(ark_ff::Zero::zero(), core::ops::Mul::mul)
            }
        }

        impl core::iter::Sum<Self> for $outer {
            fn sum<I: Iterator<Item = Self>>(iter: I) -> Self {
                iter.fold(ark_ff::Zero::zero(), core::ops::Add::add)
            }
        }

        impl<'a> core::iter::Sum<&'a Self> for $outer {
            fn sum<I: Iterator<Item = &'a Self>>(iter: I) -> Self {
                iter.fold(ark_ff::Zero::zero(), core::ops::Add::add)
            }
        }

        impl core::ops::Mul<$outer> for $outer {
            type Output = Self;

            fn mul(self, rhs: $outer) -> Self::Output {
                $outer(self.0 * rhs.0)
            }
        }

        impl core::ops::Mul<&$outer> for $outer {
            type Output = Self;

            fn mul(self, rhs: &$outer) -> Self::Output {
                $outer(self.0 * rhs.0)
            }
        }

        impl core::ops::Mul<&mut $outer> for $outer {
            type Output = Self;

            fn mul(self, rhs: &mut $outer) -> Self::Output {
                $outer(self.0 * rhs.0)
            }
        }

        impl core::ops::Div<$outer> for $outer {
            type Output = Self;

            fn div(self, rhs: $outer) -> Self::Output {
                $outer(self.0 / rhs.0)
            }
        }

        impl core::ops::Div<&$outer> for $outer {
            type Output = Self;

            fn div(self, rhs: &$outer) -> Self::Output {
                $outer(self.0 / rhs.0)
            }
        }

        impl core::ops::Div<&mut $outer> for $outer {
            type Output = Self;

            fn div(self, rhs: &mut $outer) -> Self::Output {
                $outer(self.0 / rhs.0)
            }
        }

        impl core::ops::Add<$outer> for $outer {
            type Output = Self;

            fn add(self, rhs: $outer) -> Self::Output {
                $outer(self.0 + rhs.0)
            }
        }

        impl core::ops::Add<&$outer> for $outer {
            type Output = Self;

            fn add(self, rhs: &$outer) -> Self::Output {
                $outer(self.0 + rhs.0)
            }
        }

        impl core::ops::Add<&mut $outer> for $outer {
            type Output = Self;

            fn add(self, rhs: &mut $outer) -> Self::Output {
                $outer(self.0 + rhs.0)
            }
        }

        impl core::ops::Sub<$outer> for $outer {
            type Output = Self;

            fn sub(self, rhs: $outer) -> Self::Output {
                $outer(self.0 - rhs.0)
            }
        }

        impl core::ops::Sub<&$outer> for $outer {
            type Output = Self;

            fn sub(self, rhs: &$outer) -> Self::Output {
                $outer(self.0 - rhs.0)
            }
        }

        impl core::ops::Sub<&mut $outer> for $outer {
            type Output = Self;

            fn sub(self, rhs: &mut $outer) -> Self::Output {
                $outer(self.0 - rhs.0)
            }
        }

        impl core::ops::SubAssign<$outer> for $outer {
            fn sub_assign(&mut self, rhs: $outer) {
                self.0 -= rhs.0;
            }
        }

        impl core::ops::SubAssign<&$outer> for $outer {
            fn sub_assign(&mut self, rhs: &$outer) {
                self.0 -= &rhs.0;
            }
        }

        impl core::ops::SubAssign<&mut $outer> for $outer {
            fn sub_assign(&mut self, rhs: &mut $outer) {
                self.0 -= &mut rhs.0;
            }
        }

        impl core::ops::AddAssign<$outer> for $outer {
            fn add_assign(&mut self, rhs: $outer) {
                self.0 += rhs.0;
            }
        }

        impl core::ops::AddAssign<&$outer> for $outer {
            fn add_assign(&mut self, rhs: &$outer) {
                self.0 += &rhs.0;
            }
        }

        impl core::ops::AddAssign<&mut $outer> for $outer {
            fn add_assign(&mut self, rhs: &mut $outer) {
                self.0 += &mut rhs.0;
            }
        }

        impl core::ops::DivAssign<$outer> for $outer {
            fn div_assign(&mut self, rhs: $outer) {
                self.0 /= rhs.0;
            }
        }

        impl core::ops::DivAssign<&$outer> for $outer {
            fn div_assign(&mut self, rhs: &$outer) {
                self.0 /= &rhs.0;
            }
        }

        impl core::ops::DivAssign<&mut $outer> for $outer {
            fn div_assign(&mut self, rhs: &mut $outer) {
                self.0 /= &mut rhs.0;
            }
        }

        impl core::ops::MulAssign<$outer> for $outer {
            fn mul_assign(&mut self, rhs: $outer) {
                self.0 *= rhs.0;
            }
        }

        impl core::ops::MulAssign<&$outer> for $outer {
            fn mul_assign(&mut self, rhs: &$outer) {
                self.0 *= &rhs.0;
            }
        }

        impl core::ops::MulAssign<&mut $outer> for $outer {
            fn mul_assign(&mut self, rhs: &mut $outer) {
                self.0 *= &mut rhs.0;
            }
        }

        impl From<u128> for $outer {
            fn from(value: u128) -> Self {
                $outer(<$inner>::from(value))
            }
        }

        impl From<u64> for $outer {
            fn from(value: u64) -> Self {
                $outer(<$inner>::from(value))
            }
        }

        impl From<u32> for $outer {
            fn from(value: u32) -> Self {
                $outer(<$inner>::from(value))
            }
        }

        impl From<u16> for $outer {
            fn from(value: u16) -> Self {
                $outer(<$inner>::from(value))
            }
        }

        impl From<u8> for $outer {
            fn from(value: u8) -> Self {
                $outer(<$inner>::from(value))
            }
        }

        impl From<bool> for $outer {
            fn from(value: bool) -> Self {
                $outer(<$inner>::from(value))
            }
        }
    };
}
