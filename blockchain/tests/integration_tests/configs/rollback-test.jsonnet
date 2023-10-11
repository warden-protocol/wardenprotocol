local config = import 'default.jsonnet';

config {
  'qredofusiontestnet_257-1'+: {
    validators: super.validators[0:1] + [{
      name: 'fullnode',
    }],
  },
}
