final: prev: {
  go_1_18 = prev.go_1_18.override ({
    inherit (final.darwin.apple_sdk_11_0.frameworks) Security Foundation;
    xcbuild = prev.xcbuild.override {
      inherit (final.darwin.apple_sdk_11_0) stdenv;
    };
  } // final.lib.optionalAttrs final.stdenv.isDarwin {
    inherit (final.darwin.apple_sdk_11_0) stdenv;
  });
}
