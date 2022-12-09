{ pkgs }:
pkgs.poetry2nix.mkPoetryEnv {
  projectDir = ../tests/integration_tests;
  python = pkgs.python39;
  overrides = pkgs.poetry2nix.overrides.withDefaults (self: super: {
    eth-bloom = super.eth-bloom.overridePythonAttrs {
      preConfigure = ''
        substituteInPlace setup.py --replace \'setuptools-markdown\' ""
      '';
    };

    pystarport = super.pystarport.overridePythonAttrs (
      old: {
        nativeBuildInputs = (old.nativeBuildInputs or [ ]) ++ [ self.poetry ];
      }
    );
  });
}
