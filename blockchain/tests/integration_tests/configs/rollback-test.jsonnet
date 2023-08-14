local config = import 'default.jsonnet';

config {
  'fusion_420-1'+: {
    validators: super.validators[0:1] + [{
      name: 'fullnode',
    }],
  },
}
