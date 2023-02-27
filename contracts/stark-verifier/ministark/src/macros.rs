// Adapted from the `forward_ref_binop!` macro in the Rust standard library.
// Implements "&T op U", "T op &U" based on "T op U"
macro_rules! forward_ref_binop {
    (
        impl < Fp: GpuFftField + FftField,Fq: StarkExtensionOf < Fp > >
        $imp:ident,
        $method:ident for
        $t:ty,
        $u:ty
    ) => {
        impl<'a, Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>> $imp<$u> for &'a $t {
            type Output = <$t as $imp<$u>>::Output;

            #[inline]
            fn $method(self, other: $u) -> <&'a $t as $imp<&'a $u>>::Output {
                $imp::$method(self.clone(), other)
            }
        }

        impl<'a, Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>> $imp<&'a $u> for $t {
            type Output = <&'a $t as $imp<&'a $u>>::Output;

            #[inline]
            fn $method(self, other: &$u) -> <&'a $t as $imp<&'a $u>>::Output {
                $imp::$method(self, other.clone())
            }
        }
    };
}

// Adapted from the `forward_ref_op_assign!` macro in the Rust standard library.
// implements "T op= &U", based on "T op= U"
macro_rules! forward_ref_op_assign {
    (
        impl < Fp: GpuFftField + FftField,Fq: StarkExtensionOf < Fp > >
        $imp:ident,
        $method:ident for
        $t:ty,
        $u:ty
    ) => {
        impl<'a, Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>> $imp<&'a $u> for $t {
            #[inline]
            fn $method(&mut self, other: &'a $u) {
                $imp::$method(self, other.clone());
            }
        }
    };
}
