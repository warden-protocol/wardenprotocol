import { GeneratedType } from "@cosmjs/proto-signing";
import { GenesisState } from "./types/cosmos/evidence/v1beta1/genesis";
import { MsgSubmitEvidence } from "./types/cosmos/evidence/v1beta1/tx";
import { Equivocation } from "./types/cosmos/evidence/v1beta1/evidence";
import { QueryEvidenceRequest } from "./types/cosmos/evidence/v1beta1/query";
import { QueryAllEvidenceRequest } from "./types/cosmos/evidence/v1beta1/query";
import { QueryAllEvidenceResponse } from "./types/cosmos/evidence/v1beta1/query";
import { MsgSubmitEvidenceResponse } from "./types/cosmos/evidence/v1beta1/tx";
import { QueryEvidenceResponse } from "./types/cosmos/evidence/v1beta1/query";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/cosmos.evidence.v1beta1.GenesisState", GenesisState],
    ["/cosmos.evidence.v1beta1.MsgSubmitEvidence", MsgSubmitEvidence],
    ["/cosmos.evidence.v1beta1.Equivocation", Equivocation],
    ["/cosmos.evidence.v1beta1.QueryEvidenceRequest", QueryEvidenceRequest],
    ["/cosmos.evidence.v1beta1.QueryAllEvidenceRequest", QueryAllEvidenceRequest],
    ["/cosmos.evidence.v1beta1.QueryAllEvidenceResponse", QueryAllEvidenceResponse],
    ["/cosmos.evidence.v1beta1.MsgSubmitEvidenceResponse", MsgSubmitEvidenceResponse],
    ["/cosmos.evidence.v1beta1.QueryEvidenceResponse", QueryEvidenceResponse],
    
];

export { msgTypes }