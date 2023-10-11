local config = import 'default.jsonnet';

config {
  'qredofusiontestnet_257-1'+: {
    genesis+: {
      app_state+: {
        feemarket+: {
          params+: {
            elasticity_multiplier: 3,
            base_fee_change_denominator: 100000000,
          },
        },
      },
    },
  },
}
