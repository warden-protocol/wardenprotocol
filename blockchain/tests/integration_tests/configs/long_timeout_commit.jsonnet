local default = import 'default.jsonnet';

default {
  'qredofusiontestnet_257-1'+: {
    config+: {
      consensus+: {
        timeout_commit: '5s',
      },
    },
  },
}
