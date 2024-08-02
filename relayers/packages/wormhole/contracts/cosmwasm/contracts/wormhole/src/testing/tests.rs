use cosmwasm_std::StdResult;

use crate::state::{GuardianAddress, GuardianSetInfo, ParsedVAA};

#[test]
fn quardian_set_quorum() {
    let num_guardians_trials: Vec<usize> = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 20, 25, 100];

    let expected_quorums: Vec<usize> = vec![1, 2, 3, 3, 4, 5, 5, 6, 7, 7, 8, 9, 14, 17, 67];

    let make_guardian_set = |n: usize| -> GuardianSetInfo {
        let mut addresses = Vec::with_capacity(n);
        for _ in 0..n {
            addresses.push(GuardianAddress {
                bytes: Vec::new().into(),
            });
        }
        GuardianSetInfo {
            addresses,
            expiration_time: 0,
        }
    };

    for (i, &num_guardians) in num_guardians_trials.iter().enumerate() {
        let quorum = make_guardian_set(num_guardians).quorum();
        assert_eq!(quorum, expected_quorums[i], "quorum != expected");
    }
}

#[test]
fn deserialize_round_1() -> StdResult<()> {
    let signed_vaa = "\
        080000000901007bfa71192f886ab6819fa4862e34b4d178962958d9b2e3d943\
        7338c9e5fde1443b809d2886eaa69e0f0158ea517675d96243c9209c3fe1d94d\
        5b19866654c6980000000b150000000500020001020304000000000000000000\
        000000000000000000000000000000000000000000000000000a0261626364";
    let signed_vaa = hex::decode(signed_vaa).unwrap();

    let parsed = ParsedVAA::deserialize(signed_vaa.as_slice())?;

    let version = 8u8;
    assert_eq!(parsed.version, version, "parsed.version != expected");

    let guardian_set_index = 9u32;
    assert_eq!(
        parsed.guardian_set_index, guardian_set_index,
        "parsed.guardian_set_index != expected"
    );

    let timestamp = 2837u32;
    assert_eq!(parsed.timestamp, timestamp, "parsed.timestamp != expected");

    let nonce = 5u32;
    assert_eq!(parsed.nonce, nonce, "parsed.nonce != expected");

    let len_signers = 1u8;
    assert_eq!(
        parsed.len_signers, len_signers,
        "parsed.len_signers != expected"
    );

    let emitter_chain = 2u16;
    assert_eq!(
        parsed.emitter_chain, emitter_chain,
        "parsed.emitter_chain != expected"
    );

    let emitter_address = "0001020304000000000000000000000000000000000000000000000000000000";
    let emitter_address = hex::decode(emitter_address).unwrap();
    assert_eq!(
        parsed.emitter_address, emitter_address,
        "parsed.emitter_address != expected"
    );

    let sequence = 10u64;
    assert_eq!(parsed.sequence, sequence, "parsed.sequence != expected");

    let consistency_level = 2u8;
    assert_eq!(
        parsed.consistency_level, consistency_level,
        "parsed.consistency_level != expected"
    );

    let payload = vec![97u8, 98u8, 99u8, 100u8];
    assert_eq!(parsed.payload, payload, "parsed.payload != expected");

    let hash = vec![
        164u8, 44u8, 82u8, 103u8, 33u8, 170u8, 183u8, 178u8, 188u8, 204u8, 35u8, 53u8, 78u8, 148u8,
        160u8, 153u8, 122u8, 252u8, 84u8, 211u8, 26u8, 204u8, 128u8, 215u8, 37u8, 232u8, 222u8,
        186u8, 222u8, 186u8, 98u8, 94u8,
    ];
    assert_eq!(parsed.hash, hash, "parsed.hash != expected");

    Ok(())
}

#[test]
fn deserialize_round_2() -> StdResult<()> {
    let signed_vaa = "\
        010000000001003f3179d5bb17b6f2ecc13741ca3f78d922043e99e09975e390\
        4332d2418bb3f16d7ac93ca8401f8bed1cf9827bc806ecf7c5a283340f033bf4\
        72724abf1d274f00000000000000000000010000000000000000000000000000\
        00000000000000000000000000000000ffff0000000000000000000100000000\
        00000000000000000000000000000000000000000000000005f5e10001000000\
        0000000000000000000000000000000000000000000000007575736400030000\
        00000000000000000000f7f7dde848e7450a029cd0a9bd9bdae4b5147db30003\
        00000000000000000000000000000000000000000000000000000000000f4240";
    let signed_vaa = hex::decode(signed_vaa).unwrap();

    let parsed = ParsedVAA::deserialize(signed_vaa.as_slice())?;

    let version = 1u8;
    assert_eq!(parsed.version, version, "parsed.version != expected");

    let guardian_set_index = 0u32;
    assert_eq!(
        parsed.guardian_set_index, guardian_set_index,
        "parsed.guardian_set_index != expected"
    );

    let timestamp = 0u32;
    assert_eq!(parsed.timestamp, timestamp, "parsed.timestamp != expected");

    let nonce = 0u32;
    assert_eq!(parsed.nonce, nonce, "parsed.nonce != expected");

    let len_signers = 1u8;
    assert_eq!(
        parsed.len_signers, len_signers,
        "parsed.len_signers != expected"
    );

    let emitter_chain = 1u16;
    assert_eq!(
        parsed.emitter_chain, emitter_chain,
        "parsed.emitter_chain != expected"
    );

    let emitter_address = "000000000000000000000000000000000000000000000000000000000000ffff";
    let emitter_address = hex::decode(emitter_address).unwrap();
    assert_eq!(
        parsed.emitter_address, emitter_address,
        "parsed.emitter_address != expected"
    );

    let sequence = 0u64;
    assert_eq!(parsed.sequence, sequence, "parsed.sequence != expected");

    let consistency_level = 0u8;
    assert_eq!(
        parsed.consistency_level, consistency_level,
        "parsed.consistency_level != expected"
    );

    let payload = vec![
        1u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8,
        0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 5u8, 245u8, 225u8, 0u8, 1u8, 0u8,
        0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8,
        0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 117u8, 117u8, 115u8, 100u8, 0u8, 3u8, 0u8, 0u8,
        0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 247u8, 247u8, 221u8, 232u8, 72u8, 231u8,
        69u8, 10u8, 2u8, 156u8, 208u8, 169u8, 189u8, 155u8, 218u8, 228u8, 181u8, 20u8, 125u8,
        179u8, 0u8, 3u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8,
        0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 15u8, 66u8, 64u8,
    ];
    assert_eq!(parsed.payload, payload, "parsed.payload != expected");

    let hash = vec![
        114u8, 108u8, 111u8, 78u8, 204u8, 83u8, 150u8, 170u8, 240u8, 15u8, 193u8, 176u8, 165u8,
        87u8, 174u8, 230u8, 94u8, 222u8, 106u8, 206u8, 179u8, 203u8, 193u8, 187u8, 1u8, 148u8,
        17u8, 40u8, 248u8, 214u8, 147u8, 68u8,
    ];
    assert_eq!(parsed.hash, hash, "parsed.hash != expected");

    Ok(())
}
