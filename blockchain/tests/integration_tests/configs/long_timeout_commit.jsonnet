local default = import 'default.jsonnet';

default {
  'fusion_420-1'+: {
    config+: {
      consensus+: {
        timeout_commit: '5s',
      },
    },
  },
}
