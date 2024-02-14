/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import useCosmosTxV1Beta1 from "../hooks/useCosmosTxV1Beta1";
import { useAddressContext } from "./addressContext";

export const useTransactions = () => {
  const { address } = useAddressContext();
  const { ServiceGetTxsEvent } = useCosmosTxV1Beta1();
  const SENT_EVENT = `transfer.sender='${address}'`;
  const RECEIVED_EVENT = `transfer.recipient='${address}'`;
  const sentQuery = ServiceGetTxsEvent({ query: SENT_EVENT }, {}, 100);
  const receivedQuery = ServiceGetTxsEvent({ query: RECEIVED_EVENT }, {}, 100);
  type HelperTxs = NonNullable<NonNullable<Required<typeof sentQuery.data>>["pages"][0]["tx_responses"]>;
  const allSent =
    sentQuery.data?.pages.reduce((txs, page) => {
      if (page.tx_responses) {
        return txs.concat(page.tx_responses);
      } else {
        return txs;
      }
    }, [] as HelperTxs) ?? ([] as HelperTxs);

  const allReceived =
    receivedQuery.data?.pages.reduce((txs, page) => {
      if (page.tx_responses) {
        return txs.concat(page.tx_responses);
      } else {
        return txs;
      }
    }, [] as HelperTxs) ?? ([] as HelperTxs);
  const txs = useMemo(() => {
    return allSent
      .map((x) => ({ type: "sent", ...x }))
      .concat(
        allReceived.map((x) => ({
          type: "received",
          ...x,
        })) ?? [],
      )
      .sort((a, b) => {
        return (Number(a.height) ?? 0) < (Number(b.height) ?? 0) ? 1 : -1;
      });
  }, [allSent, allReceived]);
  const transferTxs = useMemo(() => {
    return txs?.filter((x) =>
      ((x.tx as any)?.body.messages as any[]).some(
        (x) =>
          x["@type"] == "/cosmos.bank.v1beta1.MsgSend" || x["@type"] == "/ibc.applications.transfer.v1.MsgTransfer",
      ),
    );
  }, [txs]);
  return {
    txs,
    transferTxs,
    hasMoreSent: sentQuery.hasNextPage,
    hasMoreReceived: receivedQuery.hasNextPage,
    fetchSent: sentQuery.fetchNextPage,
    fetchReceived: receivedQuery.fetchNextPage,
  };
};
