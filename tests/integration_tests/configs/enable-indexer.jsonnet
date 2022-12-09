local config = import 'default.jsonnet';

config {
  'ethermint_9000-1'+: {
    config+: {
      tx_index+: {
        indexer: 'null',
      },
    },
    'app-config'+: {
      pruning: 'everything',
      'state-sync'+: {
        'snapshot-interval': 0,
      },
      'json-rpc'+: {
        'enable-indexer': true,
      },
    },
  },
}
