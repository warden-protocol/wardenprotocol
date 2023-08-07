local config = import 'default.jsonnet';

config {
  'ethermint_9000-1'+: {
    validators: super.validators[0:1] + [{
      name: 'fullnode',
    }],
  },
}
