import Joi from "joi";
import type { WagmiInitOptions } from "./types";
import { ValidateReturn, validate } from "@web3-onboard/common";

const wagmiInitOptionsSchema = Joi.object({
	requestAccounts: Joi.function().required(),
	getChainId: Joi.function().required(),
	disconnect: Joi.function().required(),
	switchChain: Joi.function().required(),
	updateChain: Joi.function().required(),
	addOrSwitchChain: Joi.function().required(),
});

export const validateWagmiInit = (request: WagmiInitOptions): ValidateReturn =>
	validate(
		// @ts-expect-error conflicting types fixme
		wagmiInitOptionsSchema,
		request,
	);
