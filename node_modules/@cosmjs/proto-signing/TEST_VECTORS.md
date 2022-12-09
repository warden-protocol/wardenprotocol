# How to generate test vectors

You need to compile a version of `simd` locally and sign some transactions. It
seems my printfs got committed into master somehow, so we have debug info
without forking!

The following was tested on `v0.40.0-rc0` of
[`cosmos-sdk`](https://github.com/cosmos/cosmos-sdk). Just a little patch from
my branch (which can be rebased).

## Setup

Test vectors are generated using those additions:
https://github.com/CosmWasm/cosmos-sdk/pull/58

```
git clone https://github.com/CosmWasm/cosmos-sdk.git
cd cosmos-sdk
git checkout cosmjs-test-vectors-v2

# Use one of those build commands. The first one is native, the other two use a docker build container.
make build
make build-simd-linux
make build-simd-darwin

ls -l ./build
./build/simd version
# I got `goz-phase-1-1170-g2a8d2d35d` for commit `2a8d2d35daab`
```

**IMPORTANT** this stores the proper `simd` binary in `./build/simd`. You may
well have another one in your global path, so calling `simd` instead of
`./build/simd` may lead to confusing results. Please use the path to ensure the
proper version.

## Prepare the Keys

You want to ensure you use the same keys as in the test vector,
[taken from here](https://github.com/cosmos/cosmjs/blob/v0.24.0-alpha.25/packages/proto-signing/src/testutils.spec.ts#L4-L12).
This uses the testgen mnemonic:

`economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone`

```
./build/simd keys add testgen -i
# enter mnemonic, and no passphrase

./build/simd keys show -a testgen
# cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6

./build/simd keys show testgen
# this shows bech32 encoded pubkey!! (I think they need to fix that)
```

## Create the transactions

First we create the unsigned transaction template we will be signing. We want to
use the same flags as the testvectors create manually.

```
./build/simd tx bank send --generate-only --chain-id simd-testing --fees 2000ucosm $(./build/simd keys show -a testgen) cosmos1qypqxpq9qcrsszg2pvxq6rs0zqg3yyc5lzv7xu 1234567ucosm > unsigned_tx.json
```

This is what I get from `jq . unsigned_tx.json`, which is slightly different
that the current test vector, in that I added a non-empty fee amount to properly
test that:

```json
{
  "body": {
    "messages": [
      {
        "@type": "/cosmos.bank.v1beta1.MsgSend",
        "from_address": "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        "to_address": "cosmos1qypqxpq9qcrsszg2pvxq6rs0zqg3yyc5lzv7xu",
        "amount": [
          {
            "denom": "ucosm",
            "amount": "1234567"
          }
        ]
      }
    ],
    "memo": "",
    "timeout_height": "0",
    "extension_options": [],
    "non_critical_extension_options": []
  },
  "auth_info": {
    "signer_infos": [],
    "fee": {
      "amount": [
        {
          "denom": "ucosm",
          "amount": "2000"
        }
      ],
      "gas_limit": "200000",
      "payer": "",
      "granter": ""
    }
  },
  "signatures": []
}
```

## Generating Signatures

All current test vectors were signed from account number 1, with increasing
sequences (0, 1, 2). You can produce these with the following commands:

```
# you may need to add `--home /tmp` if you get errors
./build/simd tx sign --offline --sign-mode direct -a 1 -s 0 --from testgen --chain-id simd-testing unsigned_tx.json
./build/simd tx sign --offline --sign-mode direct -a 1 -s 1 --from testgen --chain-id simd-testing unsigned_tx.json
./build/simd tx sign --offline --sign-mode direct -a 1 -s 2 --from testgen --chain-id simd-testing unsigned_tx.json
```

For each sign command you will get output that looks more or less like this:

```
Sign Mode: SIGN_MODE_DIRECT

Body bytes: 0a90010a1c2f636f736d6f732e62616e6b2e763162657461312e4d736753656e6412700a2d636f736d6f7331706b707472653766646b6c366766727a6c65736a6a766878686c63337234676d6d6b38727336122d636f736d6f7331717970717870713971637273737a673270767871367273307a716733797963356c7a763778751a100a0575636f736d120731323334353637

Auth info bytes: 0a4e0a460a1f2f636f736d6f732e63727970746f2e736563703235366b312e5075624b657912230a21034f04181eeba35391b858633a765c4a0c189697b40d216354d50890d350c7029012040a02080112130a0d0a0575636f736d12043230303010c09a0c

Sign Bytes: 0a93010a90010a1c2f636f736d6f732e62616e6b2e763162657461312e4d736753656e6412700a2d636f736d6f7331706b707472653766646b6c366766727a6c65736a6a766878686c63337234676d6d6b38727336122d636f736d6f7331717970717870713971637273737a673270767871367273307a716733797963356c7a763778751a100a0575636f736d12073132333435363712650a4e0a460a1f2f636f736d6f732e63727970746f2e736563703235366b312e5075624b657912230a21034f04181eeba35391b858633a765c4a0c189697b40d216354d50890d350c7029012040a02080112130a0d0a0575636f736d12043230303010c09a0c1a0c73696d642d74657374696e672001

Signature: c9dd20e07464d3a688ff4b710b1fbc027e495e797cfa0b4804da2ed117959227772de059808f765aa29b8f92edf30f4c2c5a438e30d3fe6897daa7141e3ce6f9

Signed TX Bytes: 0a93010a90010a1c2f636f736d6f732e62616e6b2e763162657461312e4d736753656e6412700a2d636f736d6f7331706b707472653766646b6c366766727a6c65736a6a766878686c63337234676d6d6b38727336122d636f736d6f7331717970717870713971637273737a673270767871367273307a716733797963356c7a763778751a100a0575636f736d12073132333435363712650a4e0a460a1f2f636f736d6f732e63727970746f2e736563703235366b312e5075624b657912230a21034f04181eeba35391b858633a765c4a0c189697b40d216354d50890d350c7029012040a02080112130a0d0a0575636f736d12043230303010c09a0c1a40c9dd20e07464d3a688ff4b710b1fbc027e495e797cfa0b4804da2ed117959227772de059808f765aa29b8f92edf30f4c2c5a438e30d3fe6897daa7141e3ce6f9
{"body":{"messages":[{"@type":"/cosmos.bank.v1beta1.MsgSend","from_address":"cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6","to_address":"cosmos1qypqxpq9qcrsszg2pvxq6rs0zqg3yyc5lzv7xu","amount":[{"denom":"ucosm","amount":"1234567"}]}],"memo":"","timeout_height":"0","extension_options":[],"non_critical_extension_options":[]},"auth_info":{"signer_infos":[{"public_key":{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ"},"mode_info":{"single":{"mode":"SIGN_MODE_DIRECT"}},"sequence":"0"}],"fee":{"amount":[{"denom":"ucosm","amount":"2000"}],"gas_limit":"200000","payer":"","granter":""}},"signatures":["yd0g4HRk06aI/0txCx+8An5JXnl8+gtIBNou0ReVkid3LeBZgI92WqKbj5Lt8w9MLFpDjjDT/miX2qcUHjzm+Q=="]}
```

This should be enough to re-generate and update the test vectors as you wish.
