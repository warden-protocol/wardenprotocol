import { StatusResponse } from "./types/cosmos/base/node/v1beta1/query";
import { ConfigRequest } from "./types/cosmos/base/node/v1beta1/query";
import { ConfigResponse } from "./types/cosmos/base/node/v1beta1/query";
import { StatusRequest } from "./types/cosmos/base/node/v1beta1/query";
const msgTypes = [
    ["/cosmos.base.node.v1beta1.StatusResponse", StatusResponse],
    ["/cosmos.base.node.v1beta1.ConfigRequest", ConfigRequest],
    ["/cosmos.base.node.v1beta1.ConfigResponse", ConfigResponse],
    ["/cosmos.base.node.v1beta1.StatusRequest", StatusRequest],
];
export { msgTypes };
