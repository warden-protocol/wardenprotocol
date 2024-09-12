import { warden } from "@wardenprotocol/wardenjs";
import { MsgNewInferenceRequestResponse } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/tx";
import { SolverInput } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/inference";
import { getClient, useTx } from "./useClient";

export default function useRequestInference() {
    const { tx } = useTx();
    const { newInferenceRequest } =
        warden.warden.v1beta3.MessageComposer.withTypeUrl;

    async function sendRequestInference(
        creator: string,
        contractCallback: string,
        input: SolverInput
    ) {
        return await tx(
            [
                newInferenceRequest({
                    creator,
                    contractCallback,
                    input,
                }),
            ],
            {}
        );
    }

    return {
        requestInference: async (
            creator: string,
            contractCallback: string,
            input: SolverInput
        ) => {
            try {
                const client = await getClient();

                const res = await sendRequestInference(
                    creator,
                    contractCallback,
                    input
                );
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

                return InferenceRequest;
            } catch (e) {
                console.error(e);
            }
        },
        reset: () => {},
    };
}
