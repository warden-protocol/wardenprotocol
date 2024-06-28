use std::collections::BTreeMap;

use cosmwasm_std::Binary;
use serde_json::{Map, Value};
use sha2::{Digest, Sha256};

#[derive(Debug)]
pub struct OsmosisTransaction {
    pub signature_hash: Binary,
}

pub fn parse(bytes: Binary) -> Result<OsmosisTransaction, Box<dyn std::error::Error>> {
    let value: Value = serde_json::from_slice(&bytes)?;
    if let Value::Object(obj) = value {
        let sorted_fields: BTreeMap<_, _> = obj.into_iter().collect();
        let sorted_payload = serde_json::to_string(&Value::Object(Map::from_iter(sorted_fields)))?;

        let signature_hash = Sha256::new()
            .chain_update(sorted_payload)
            .finalize()
            .as_slice()
            .into();

        Ok(OsmosisTransaction { signature_hash })
    } else {
        Err("invalid json payload".into())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_parse() -> Result<(), Box<dyn std::error::Error>> {
        let txpayload = b"
        {
          \"chain_id\": \"osmosis-1\",
          \"account_number\": \"2037934\",
          \"sequence\": \"0\",
          \"fee\": {
            \"gas\": \"583061\",
            \"amount\": [
              {
                \"amount\": \"259\",
                \"denom\": \"ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2\"
              }
            ]
          },
          \"msgs\": [
            {
              \"type\": \"osmosis/poolmanager/swap-exact-amount-in\",
              \"value\": {
                \"sender\": \"osmo16hmn8nh3fn79ce53fxdmp6p7fpp4mdnc3t80dw\",
                \"routes\": [
                  {
                    \"pool_id\": \"1400\",
                    \"token_out_denom\": \"uosmo\"
                  }
                ],
                \"token_in\": {
                  \"denom\": \"ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2\",
                  \"amount\": \"500000\"
                },
                \"token_out_min_amount\": \"4227660\"
              }
            }
          ],
          \"memo\": \"FE\",
          \"timeout_height\": \"14705680\"
        }
        ";
        let tx = parse(txpayload.into())?;
        println!("{:?}", tx);
        let hash = hex::encode(tx.signature_hash);
        assert_eq!(
            hash,
            "858a2e13af1c1d6a89357d2408fa68a6e17fa5a97437c95c44fafae1746bc203"
        );
        Ok(())
    }
}
