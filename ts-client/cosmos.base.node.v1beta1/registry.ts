import { GeneratedType } from "@cosmjs/proto-signing";
import { ConfigRequest } from "./types/cosmos/base/node/v1beta1/query";
import { ConfigResponse } from "./types/cosmos/base/node/v1beta1/query";
import { StatusRequest } from "./types/cosmos/base/node/v1beta1/query";
import { StatusResponse } from "./types/cosmos/base/node/v1beta1/query";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/cosmos.base.node.v1beta1.ConfigRequest", ConfigRequest],
    ["/cosmos.base.node.v1beta1.ConfigResponse", ConfigResponse],
    ["/cosmos.base.node.v1beta1.StatusRequest", StatusRequest],
    ["/cosmos.base.node.v1beta1.StatusResponse", StatusResponse],
    
];

export { msgTypes }