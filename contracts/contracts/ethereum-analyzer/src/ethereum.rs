use alloy_consensus::TxEip1559;
use alloy_rlp::Decodable;
use cosmwasm_std::Binary;

pub fn parse(bytes: Binary) -> Result<TxEip1559, Box<dyn std::error::Error>> {
    let _tx_type = bytes[0];
    if _tx_type != 2 {
        return Err("only EIP1559 transactions are supported (transaction type 2, the input payload must start with 0x02)".into());
    }

    let tx_rlp = &bytes[1..];

    Ok(TxEip1559::decode(&mut tx_rlp.into())?)
}

#[cfg(test)]
mod tests {
    use super::*;
    use alloy_consensus::SignableTransaction;

    #[test]
    fn test_parse() -> Result<(), Box<dyn std::error::Error>> {
        let txhex = "02f283aa36a70a843b9aca008529779987ce82520894077cfb491cea8f35304ab3a6015f4ea3756ba50687038d7ea4c6800080c0";
        let txbytez = hex::decode(txhex)?;

        let tx = parse(txbytez.into())?;
        println!("{:?}", tx);
        let hash = hex::encode(tx.signature_hash());
        assert_eq!(
            hash,
            "2f53d4dcac8f9242d1c1704ac8fe8a0c2c274218b019d0ab7ce32474f9c91136"
        );
        Ok(())
    }
}
