const { join } = require('path');
const telescope = require('@cosmology/telescope').default;
const rimraf = require('rimraf').rimrafSync;
const replace = require('replace-in-file');
const { AMINO_MAP } = require('./aminos.cjs');

const protoDirs = [
  join(__dirname, '/../proto'),
  join(__dirname, '/../../proto')
];
const outPath = join(__dirname, '../src/codegen');
rimraf(outPath);

telescope({
  protoDirs,
  outPath,
  options: {
    tsDisable: {
      disableAll: true, // FIXME types aren't resolving correctly
      files: [
        'cosmos/authz/v1beta1/tx.amino.ts',
        'cosmos/staking/v1beta1/tx.amino.ts'
      ],
      patterns: ['**/*amino.ts', '**/*registry.ts']
    },
    // restoreImportExtension: '.js',
    prototypes: {
      includePackageVar: false,
      removeUnusedImports: true,
      experimentalGlobalProtoNamespace: true,
      interfaces: {
        enabled: true,
        useUnionTypes: false
      },
      excluded: {
        packages: [
          'ibc.applications.fee.v1', // issue with parsing protos (LCD routes with nested objects in params)

          'cosmos.app.v1alpha1',
          'cosmos.app.v1beta1',
          'cosmos.base.kv.v1beta1',
          'cosmos.base.reflection.v1beta1',
          'cosmos.base.snapshots.v1beta1',
          'cosmos.base.store.v1beta1',
          'cosmos.crisis.v1beta1',
          'cosmos.evidence.v1beta1',
          'cosmos.genutil.v1beta1',

          'cosmos.autocli.v1',

          'cosmos.msg.v1',
          'cosmos.nft.v1beta1',
          'cosmos.capability.v1beta1',
          'cosmos.orm.v1alpha1',
          'cosmos.orm.v1',
          'cosmos.slashing.v1beta1',
          'google.api',
          'ibc.core.port.v1',
          'ibc.core.types.v1'
        ]
      },
      methods: {
        fromJSON: true,
        toJSON: true,
        encode: true,
        decode: true,
        fromPartial: true,
        toAmino: true,
        fromAmino: true,
        fromProto: true,
        toProto: true
      },
      parser: {
        keepCase: false
      },
      // addTypeUrlToObjects: true,
      // addTypeUrlToDecoders: true,
      // enableRegistryLoader: false,
      typingsFormat: {
        duration: 'duration',
        timestamp: 'timestamp',
        useExact: false,
        useDeepPartial: false,
        num64: 'bigint',
        // useTelescopeGeneratedType: true,
        toJsonUnknown: false,
        customTypes: {
          useCosmosSDKDec: true
        }
      }
    },
    aminoEncoding: {
      enabled: true,
      exceptions: AMINO_MAP
    },
    lcdClients: {
      enabled: true
    },
    rpcClients: {
      enabled: true,
      camelCase: true
    },
    reactQuery: {
      enabled: true,
      instantExport: {
        include: {
          patterns: ['warden.act.v1beta1.**', 'warden.warden.v1beta3.**']
        }
      }
    }
  }
})
  // rename globalThis -> wardenjs_globalThis to avoid conflicts with globalThis polyfills
  .then(() =>
    replace({
      files: join(outPath, 'helpers.ts'),
      from: /globalThis/g,
      to: 'wardenjs_globalThis'
    })
  )
  .then(() =>
    replace({
      files: join(outPath, '**/*.ts'),
      from: [/from "\.(.*)"/g, /from '\.(.*)'/g],
      to: `from "\.$1.js"`
    })
  )

  .then(() =>
    replace({
      files: join(outPath, '**/*.ts'),
      from: /import\("\.(.*)"/g,
      to: `import("\.$1.js"`
    })
  )
  .then(() =>
    replace({
      files: join(outPath, '**/*.ts'),
      from: /import \* as (.*) from "protobufjs\/minimal"/,
      to: `import $1 from "protobufjs/minimal.js"`
    })
  )
  .then(() => {
    console.log('✨ all done!');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
