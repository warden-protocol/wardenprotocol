local config = import 'default.jsonnet';

config {
  'fusion_420-1'+: {
    'app-config'+: {
      'minimum-gas-prices': '100000000000nQRDO',
    },
    genesis+: {
      app_state+: {
        feemarket+: {
          params+: {
            base_fee:: super.base_fee,
          },
        },
      },
    },
  },
}
