import { useNewAction } from "./useAction";
import { warden } from "@wardenprotocol/wardenjs";
import {
    MsgNewInferenceRequest,
    MsgNewInferenceRequestResponse,
} from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/tx";
import { getClient } from "./useClient";
import { ActionStatus } from "@wardenprotocol/wardenjs/codegen/warden/act/v1beta1/action";

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const { MsgNewActionResponse } = warden.act.v1beta1;

export default function useRequestInference() {
    const { newAction, authority } = useNewAction(MsgNewInferenceRequest);

    async function sendRequestInference(creator: string, input: Uint8Array) {
        if (!authority) return;
        return await newAction(
            {
                creator,
                input,
                authority,
            },
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

                const actionCreated = MsgNewActionResponse.decode(
                    res.msgResponses[0].value
                );
                const actionId = actionCreated.id;

                // wait for action to be completed
                let InferenceRequestId = null;
                // eslint-disable-next-line no-constant-condition
                while (true) {
                    const res = await client.warden.act.v1beta1.actionById({
                        id: actionId,
                    });

                    if (
                        res.action?.status !==
                            ActionStatus.ACTION_STATUS_PENDING &&
                        res.action?.status !==
                            ActionStatus.ACTION_STATUS_COMPLETED
                    ) {
                        throw new Error(
                            `action failed: ${JSON.stringify(res.action)}`
                        );
                    }

                    if (
                        res.action?.result?.typeUrl !==
                        MsgNewInferenceRequestResponse.typeUrl
                    ) {
                        throw new Error(
                            `unexpected action result type: ${res.action?.result?.typeUrl}. Expected ${MsgNewInferenceRequestResponse.typeUrl}`
                        );
                    }

                    if (res.action?.result?.value) {
                        InferenceRequestId =
                            MsgNewInferenceRequestResponse.decode(
                                res.action?.result.value
                            ).id;
                        if (InferenceRequestId) {
                            break;
                        }
                    }

                    await sleep(1000);
                }

                // wait for request to be processed by keychain
                // setData({ state: InferenceRequesterState.WAITING_KEYCHAIN });
                // eslint-disable-next-line no-constant-condition
                while (true) {
                    const res =
                        await client.warden.warden.v1beta3.inferenceRequestById(
                            {
                                id: InferenceRequestId,
                            }
                        );

                    const InferenceRequest = res.inferenceRequest;

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
                }
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
