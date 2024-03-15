import { Params } from "react-router-dom";
import Keys from "../components/keys";
import { useSpaceAddress } from "@/hooks/useSpaceAddress";
import NewKeyButton from "@/components/new-key-button";
import useRequestKey from "@/hooks/useRequestKey";
import KeyRequestDialog from "@/components/key-request-dialog";
import NoActiveSpace from "@/components/no-active-space";

function KeysPage() {
    const { state, error, keyRequest, reset } = useRequestKey();

    const { spaceAddress } = useSpaceAddress();

    return (
        <div className="flex flex-col flex-1 h-full px-8 py-4 space-y-8">
            <div className="flex items-center justify-between pb-4 space-y-2 border-b">
                <div>
                    <h2 className="text-4xl">Keys</h2>
                    <p className="text-muted-foreground hidden xl:block">
                        Keys are used to derive blockchain addresses and sign
                        transactions.
                    </p>
                </div>
                {spaceAddress ? (
                    <div>
                        <NewKeyButton />
                        <KeyRequestDialog
                            state={state}
                            error={error}
                            keyRequest={keyRequest}
                            reset={reset}
                        />
                    </div>
                ) : null}
            </div>
            <div className="h-full flex-1 flex-col space-y-8 flex">
                {spaceAddress ? (
                    <>
                        <Keys spaceAddr={spaceAddress} />
                    </>
                ) : (
                    <NoActiveSpace />
                )}
            </div>
        </div>
    );
}

export async function loader({ params }: { params: Params<string> }) {
    if (!params.spaceAddr) {
        throw new Error("No space address provided");
    }
    return {
        spaceAddr: params.spaceAddr,
    };
}

export default KeysPage;
