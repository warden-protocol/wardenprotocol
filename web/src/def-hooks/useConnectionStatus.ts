import useCosmosBaseTendermintV1Beta1 from "../hooks/useCosmosBaseTendermintV1Beta1";
import { env } from "../env";
import { useEffect, useState } from "react";

export const useConnectionStatus = () => {
  const query = useCosmosBaseTendermintV1Beta1();
  const nodeInfo = query.ServiceGetNodeInfo({});
  const [apiConnected, setApiConnected] = useState(false);
  const [rpcConnected, setRpcConnected] = useState(false);
  const [wsConnected, setWsConnected] = useState(false);
  useEffect(() => {
    setApiConnected(!nodeInfo.error);
  }, [nodeInfo]);

  const rpcCheck = async () => {
    try {
      await fetch(env.rpcURL);
      setRpcConnected(true);
      setWsConnected(true);
    } catch (e) {
      console.error(e);
      setRpcConnected(false);
      setWsConnected(false);
    } finally {
      setTimeout(rpcCheck, 10000);
    }
  };
  rpcCheck();
  return { apiConnected, rpcConnected, wsConnected };
};
