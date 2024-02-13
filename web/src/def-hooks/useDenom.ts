import { useMemo } from "react";
import useIbcApplicationsTransferV1 from "../hooks/useIbcApplicationsTransferV1";
import { useDenomContext } from "./denomContext";

export const useDenom = (denom: string) => {
  const isIBC = denom.indexOf("ibc/") == 0;
  const hash = denom.split("/")[1];
  const { QueryDenomTrace } = useIbcApplicationsTransferV1();
  const denomTrace = QueryDenomTrace(hash, { enabled: isIBC }).data;
  const normalized = useMemo(() => {
    if (isIBC) {
      return denomTrace?.denom_trace?.base_denom?.toUpperCase() ?? "";
    } else {
      return denom.toUpperCase();
    }
  }, [denomTrace]);
  const path = useMemo(() => {
    if (isIBC) {
      return denomTrace?.denom_trace?.path ?? "";
    } else {
      return "";
    }
  }, [denomTrace]);
  const pathExtracted = useMemo(() => {
    if (isIBC) {
      return denomTrace?.denom_trace?.path?.match(/\d+/g)?.reverse() ?? [""];
    } else {
      return [""];
    }
  }, [denomTrace]);

  const { setDenom } = useDenomContext();
  setDenom(denom, { isIBC, normalized, path, pathExtracted });
  return { isIBC, denomTrace, normalized, path, pathExtracted };
};
