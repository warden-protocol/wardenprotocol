local config = import 'default.jsonnet';

config {
  'ethermint_9000-1'+: {
    'app-config'+: {
      pruning: 'everything',
      'state-sync'+: {
        'snapshot-interval': 0,
      },
    },
  },
}
