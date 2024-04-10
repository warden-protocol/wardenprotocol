import Intents from "@/features/intents";
import NewIntentButton from "@/features/intents/NewIntentButton";

import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function IntentsPage() {
    return (
        <div className="flex flex-col flex-1 h-full px-8 py-4 space-y-8">
            <div className="flex items-center justify-between pb-4 space-y-2 border-b">
                <div>
                    <h2 className="text-4xl">Intents</h2>
                    <p className="text-muted-foreground hidden xl:block">
                        Intents define who can operate on this space or use its
                        keys to generate and sign transactions.
                    </p>
                </div>
                <div>
                    <NewIntentButton />
                </div>
            </div>
            <Alert variant="destructive">
                {/* <ExclamationTriangleIcon className="h-4 w-4" /> */}
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>WIP</AlertTitle>
                <AlertDescription>
                    This page is a work in progress and is not functional yet.
                </AlertDescription>
            </Alert>
            <Intents />
        </div>
    );
}

export default IntentsPage;
