// import { useNewAction } from "./useAction";
import { warden } from "@wardenprotocol/wardenjs";
import { MsgNewInferenceRequestResponse } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/tx";
import { getClient, useTx } from "./useClient";

export default function useRequestInference() {
    const { tx } = useTx();
    const { newInferenceRequest } =
        warden.warden.v1beta3.MessageComposer.withTypeUrl;

    async function sendRequestInference(creator: string, input: Uint8Array) {
        return await tx(
            [
                newInferenceRequest({
                    creator,
                    input,
                }),
            ],
            {}
        );
    }

    return {
        requestInference: async (creator: string, input: Uint8Array) => {
            try {
                const client = await getClient();

                const res = await sendRequestInference(creator, input);
                if (!res) {
                    console.error("failed to broadcast tx");
                    throw new Error("failed to broadcast tx");
                }

                if (res.code !== 0) {
                    console.error("tx failed", res);
                    throw new Error(`tx failed with code: ${res.code}`);
                }

                const inferenceRequestCreated =
                    MsgNewInferenceRequestResponse.decode(
                        res.msgResponses[0].value
                    );

                const inferenceRequestId = inferenceRequestCreated.id;

                const result =
                    await client.warden.warden.v1beta3.inferenceRequestById({
                        id: inferenceRequestId,
                    });

                const InferenceRequest = result.inferenceRequest;

                console.log(InferenceRequest);
                // setData({ InferenceRequest });

                // if (
                //     InferenceRequest?.status ===
                //     InferenceRequest.KEY_REQUEST_STATUS_PENDING
                // ) {
                //     await sleep(1000);
                //     continue;
                // }

                // if (
                //     InferenceRequest?.status ===
                //     InferenceRequestStatus.KEY_REQUEST_STATUS_FULFILLED
                // ) {
                //     setKeySettings({
                //         settings: {
                //             ...ksRef.current?.settings,
                //             [InferenceRequest.id.toString()]:
                //                 ksRef.current?.settings[TEMP_KEY],
                //             [TEMP_KEY]: undefined,
                //         },
                //     });

                //     setData({
                //         state: InferenceRequesterState.KEY_FULFILLED,
                //     });
                //     return;
                // }

                // throw new Error(
                //     `key request rejected with reason: ${InferenceRequest?.rejectReason}`
                // );
                // }
            } catch (e) {
                // setData({
                //     state: InferenceRequesterState.ERROR,
                //     error: `${e}`,
                // });
            }
        },
        reset: () => {
            // if (
            //     data?.state === InferenceRequesterState.KEY_FULFILLED ||
            //     data?.state === InferenceRequesterState.ERROR ||
            //     data?.state === InferenceRequesterState.AWAITING_APPROVALS
            // ) {
            //     resetData();
            // }
        },
    };
}
