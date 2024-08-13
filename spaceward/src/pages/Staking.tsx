import { useCallback, useMemo, useReducer } from "react";
import clsx from "clsx";
import SignTranactionModal from "@/features/assets/SignTransactionModal";
import { Icons } from "@/components/ui/icons-assets";
import { Icons as IconsCommon } from "@/components/ui/icons";
import StakeModal from "@/features/staking/StakeModal";
import StakingHeading from "@/features/staking/StakingHeading";
import { useAddressContext } from "@/hooks/useAddressContext";
import { commonReducer } from "@/utils/common";
import DetailsModal from "@/features/staking/DetailsModal";
import Portal from "@/components/ui/portal";
import RedelegateModal from "@/features/staking/RedelegateModal";
import { LoaderCircle, XIcon } from "lucide-react";
import { StakedValidator, StakingState } from "@/features/staking/types";
import { useStakingQueries } from "@/features/staking/hooks";
import {
	getDelegationsData,
	getParamData,
	getValidatorData,
} from "@/features/staking/util";
import { bigintToFixed } from "@/lib/math";
import ValidatorRow from "@/features/staking/ValidatorRow";
import { useAsset } from "@/hooks/useAsset";

export function StakingPage() {
	const [state, dispatch] = useReducer(commonReducer<StakingState>, {
		tab: "all",
		txPending: false,
	});

	const { address } = useAddressContext();

	const {
		queryDelegations,
		queryDistributionParams,
		queryInflation,
		queryPool,
		queryStakingParams,
		queryTotalRewards,
		queryTotalSupply,
		queryValidators,
	} = useStakingQueries(address);

	const { availableWard: stakedWard, delegationsByAddress } = useMemo(
		() => getDelegationsData(queryDelegations.data?.delegationResponses),
		[queryDelegations.data?.delegationResponses],
	);

	const { balance: availableWard } = useAsset("uward");

	const { bondedTokens, apr } = useMemo(
		() =>
			getParamData({
				distributionParams: queryDistributionParams.data?.params,
				inflation: queryInflation.data?.inflation,
				pool: queryPool.data?.pool,
				totalSupply: queryTotalSupply.data?.supply,
			}),
		[
			queryDistributionParams.data?.params,
			queryInflation.data?.inflation,
			queryPool.data?.pool,
			queryTotalSupply.data?.supply,
		],
	);

	const { /* stakedWard, */ validatorsByAddress } = useMemo(
		() => getValidatorData(queryValidators.data?.validators),
		[queryValidators.data?.validators],
	);

	const items = useMemo(() => {
		let validators: StakedValidator[] | undefined;

		if (state.tab === "all") {
			validators = queryValidators.data?.validators?.map((v) => {
				const deletationIndex = delegationsByAddress[v.operatorAddress];

				const stakedAmount = (
					typeof deletationIndex === "number"
						? queryDelegations.data?.delegationResponses[
								deletationIndex
							]
						: undefined
				)?.balance;

				return { ...v, stakedAmount };
			});
		} else if (queryValidators.data) {
			validators = queryDelegations.data?.delegationResponses?.map(
				(response) => {
					const {
						balance: stakedAmount,
						delegation: { validatorAddress: address },
					} = response;

					const validatorIndex = validatorsByAddress[address];

					const validator =
						queryValidators.data.validators[validatorIndex];

					return { ...validator, stakedAmount };
				},
			);
		}

		return state.sortKey && state.sortDirection
			? validators?.sort((a, b) => {
					const key = state.sortKey!;
					const [v1, v2] = [a, b].map((v) =>
						key === "comission"
							? Number(v.commission.commissionRates.rate)
							: key === "power"
								? Number(v.tokens)
								: v.status,
					);

					const mul = state.sortDirection === "asc" ? 1 : -1;
					return (v1 - v2) * mul;
				})
			: validators;
	}, [
		state.tab,
		state.sortDirection,
		state.sortKey,
		queryDelegations.data,
		queryValidators.data,
		delegationsByAddress,
		validatorsByAddress,
	]);

	const openStakeModal = useCallback(
		(address: string) => {
			const validatorIndex = validatorsByAddress[address];
			const delegationIndex = delegationsByAddress[address];

			const validator =
				typeof validatorIndex === "number"
					? queryValidators.data?.validators[validatorIndex]
					: undefined;

			if (!validator) {
				return;
			}

			const delegation =
				typeof delegationIndex === "number"
					? queryDelegations.data?.delegationResponses[
							delegationIndex
						]
					: undefined;

			if (delegation) {
				dispatch({
					type: "set",
					payload: {
						modal: "details",
						address,
					},
				});
			} else {
				dispatch({
					type: "set",
					payload: {
						modal: "stake",
						address,
					},
				});
			}
		},
		[
			queryDelegations.data,
			queryValidators.data,
			delegationsByAddress,
			validatorsByAddress,
		],
	);

	function openSortDropdown(key: "comission" | "power" | "status") {
		return () => {
			if (state.sortDropdown === key) {
				dispatch({
					type: "sortDropdown",
					payload: undefined,
				});
			} else {
				dispatch({
					type: "sortDropdown",
					payload: key,
				});
			}
		};
	}

	function setSortDirection(
		direction: "asc" | "desc",
		key: "comission" | "power" | "status",
	) {
		return () => {
			// todo cancel sorting

			dispatch({
				type: "set",
				payload: {
					sortDropdown: undefined,
					sortKey: key,
					sortDirection: direction,
				},
			});
		};
	}

	const modalValidator = state.address
		? queryValidators.data?.validators[validatorsByAddress[state.address]]
		: undefined;

	const modalDelegation = modalValidator
		? queryDelegations.data?.delegationResponses[
				delegationsByAddress[modalValidator.operatorAddress]
			]
		: undefined;

	return (
		<div className="flex flex-col flex-1 h-full px-8 py-4 space-y-8">
			<div className="flex items-center justify-between pb-4 space-y-2">
				<div>
					<h2 className="text-5xl font-bold">Staking</h2>
					<p className="text-label-secondary"></p>
				</div>
			</div>

			<StakingHeading
				availableWard={BigInt(availableWard?.amount ?? 0)}
				stakedWard={stakedWard}
				total={queryTotalRewards.data?.total}
				unbondSeconds={
					queryStakingParams.data?.params.unbondingTime.seconds
				}
				dispatch={dispatch}
				reward={queryTotalRewards.data?.rewards[0]}
			/>

			<div className="bg-card  rounded-xl border-border-edge border-[1px] px-8 py-6">
				<div className="flex justify-between items-center">
					<div className="flex items-center gap-3">
						<div
							className={clsx(
								"text-2xl font-bold tracking-[0.12px] cursor-pointer ease-in duration-200",
								state.tab !== "all" && "text-label-tertiary",
							)}
							onClick={() =>
								dispatch({ type: "tab", payload: "all" })
							}
						>
							Validators
						</div>

						<div
							className={clsx(
								"text-2xl font-bold tracking-[0.12px] cursor-pointer ease-in duration-200",
								state.tab !== "my" && "text-label-tertiary",
							)}
							onClick={() =>
								dispatch({ type: "tab", payload: "my" })
							}
						>
							My staking
						</div>
					</div>

					<div className="flex gap-2">
						<div className="gap-2">
							<div className="group relative z-10 cursor-pointer h-8 rounded-2xl bg-card -text py-2 px-3 text-xs flex items-center gap-1 ">
								<Icons.infoWhite className="invert dark:invert-0" />
								APR{" "}
								{bigintToFixed(
									apr *
										// fixme maybe incorrect decimals
										BigInt(100),
									{
										decimals: 18,
										format: true,
										display: 2,
									},
								)}
								%
								<div
									className={clsx(
										`w-[220px] opacity-0 bg-[rgba(229,238,255,0.15)] text-white text-center text-xs rounded py-2 px-3 absolute z-10 group-hover:opacity-100 top-[-18px] left-1/2 pointer-events-none backdrop-blur-[20px] translate-x-[-50%] translate-y-[-100%] before:content-[''] before:absolute before:left-[50%] before:bottom-0  before:border-[rgba(229,238,255,0.15)] before:border-b-[8px]  before:border-l-[8px] before:border-t-[transparent]  before:border-r-[transparent] before:border-t-[8px]  before:border-r-[8px] before:w-0 before:h-0 before:rotate-[-45deg] before:translate-y-[50%] before:translate-x-[-50%]`,
									)}
								>
									APR is estimated percentage of your staked
									tokens that you will earn, on top of your
									staked tokens. The validator’s commission
									will be subtracted from it
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="h-4" />

				<div className="grid grid-cols-[1fr_150px_150px_150px_200px] gap-3 pb-2">
					<div className="text-sm	text-label-secondary">Name</div>
					<div
						onClick={openSortDropdown("comission")}
						className="text-sm cursor-pointer w-fit	text-label-secondary flex items-center gap-1 group relative"
					>
						Commission
						<Icons.chevronsUpDown className="invert dark:invert-0" />
						{state.sortDropdown === "comission" ? (
							<div className="rounded-lg overflow-hidden	bg-[rgba(229,238,255,0.15)] backdrop-blur-[20px] absolute right-0 top-[28px] w-[240px]">
								<div
									onClick={setSortDirection(
										"asc",
										"comission",
									)}
									className="cursor-pointer h-12 flex items-center px-[10px] gap-[22px] hover:bg-[rgba(229,238,255,0.3)] transition-all duration-300"
								>
									<Icons.ascending className="invert dark:invert-0" />
									<div className="text-sm whitespace-nowrap">
										Sort ascending
									</div>
								</div>
								<div
									onClick={setSortDirection(
										"desc",
										"comission",
									)}
									className="cursor-pointer h-12 flex items-center px-[10px] gap-[22px] hover:bg-[rgba(229,238,255,0.3)] transition-all duration-300"
								>
									<Icons.ascending className="rotate-180 invert dark:invert-0" />

									<div className="text-sm whitespace-nowrap">
										Sort descending
									</div>
								</div>
							</div>
						) : (
							<div></div>
						)}
					</div>
					<div
						onClick={openSortDropdown("power")}
						className="text-sm cursor-pointer relative w-fit text-label-secondary flex items-center gap-1"
					>
						Voting power
						<Icons.chevronsUpDown className="invert dark:invert-0" />
						{state.sortDropdown === "power" ? (
							<div className="rounded-lg overflow-hidden	bg-[rgba(229,238,255,0.15)] backdrop-blur-[20px] absolute right-0 top-[28px] w-[240px]">
								<div
									onClick={setSortDirection("asc", "power")}
									className="cursor-pointer h-12 flex items-center px-[10px] gap-[22px] hover:bg-[rgba(229,238,255,0.3)] transition-all duration-300"
								>
									<Icons.ascending className="invert dark:invert-0" />
									<div className="text-sm whitespace-nowrap">
										Sort ascending
									</div>
								</div>
								<div
									onClick={setSortDirection("desc", "power")}
									className="cursor-pointer h-12 flex items-center px-[10px] gap-[22px] hover:bg-[rgba(229,238,255,0.3)] transition-all duration-300"
								>
									<Icons.ascending className="rotate-180 invert dark:invert-0" />

									<div className="text-sm whitespace-nowrap">
										Sort descending
									</div>
								</div>
							</div>
						) : (
							<div></div>
						)}
					</div>
					<div
						onClick={openSortDropdown("status")}
						className="text-sm cursor-pointer relative w-fit	text-label-secondary flex items-center gap-1"
					>
						Status
						<Icons.chevronsUpDown className="invert dark:invert-0" />
						{state.sortDropdown === "status" ? (
							<div className="rounded-lg overflow-hidden	bg-[rgba(229,238,255,0.15)] backdrop-blur-[20px] absolute right-0 top-[28px] w-[240px]">
								<div className="cursor-pointer h-12 flex items-center px-[10px] gap-[22px] hover:bg-[rgba(229,238,255,0.3)] transition-all duration-300">
									<Icons.ascending className="invert dark:invert-0" />
									<div
										onClick={setSortDirection(
											"asc",
											"status",
										)}
										className="text-sm whitespace-nowrap"
									>
										Sort ascending
									</div>
								</div>
								<div
									onClick={setSortDirection("desc", "status")}
									className="cursor-pointer h-12 flex items-center px-[10px] gap-[22px] hover:bg-[rgba(229,238,255,0.3)] transition-all duration-300"
								>
									<Icons.ascending className="rotate-180 invert dark:invert-0" />

									<div className="text-sm whitespace-nowrap">
										Sort descending
									</div>
								</div>
							</div>
						) : (
							<div></div>
						)}
					</div>
					<div className="text-sm	text-label-secondary text-right">
						Amount staked
					</div>
				</div>

				{items?.map((item) => (
					<ValidatorRow
						{...item}
						key={item.operatorAddress}
						openStakeModal={openStakeModal}
						bondedTokens={bondedTokens}
					/>
				)) ?? (
					<div className="flex justify-center content-center w-full p-4">
						<LoaderCircle className="animate-spin" />
					</div>
				)}
			</div>

			{state.modal || state.txPending ? (
				<Portal domId="intent-modal">
					<div
						onClick={() => {
							dispatch({
								type: "modal",
								payload: undefined,
							});
						}}
						className="bg-overlay absolute left-0 top-0 w-full h-full backdrop-blur-[20px] flex items-center justify-center min-h-[600px]"
					>
						{state.modal === "redelegate" ? (
							<button
								onClick={() =>
									dispatch({
										type: "modal",
										payload: "details",
									})
								}
								className="absolute top-8 left-8 opacity-[0.5] hover:opacity-[100%] transition-all"
							>
								<IconsCommon.goBack />
							</button>
						) : null}

						{!state.txPending ? (
							<button
								onClick={() => {
									dispatch({
										type: "modal",
										payload: undefined,
									});
								}}
								className="absolute top-8 right-8 opacity-[0.5] hover:opacity-[100%] transition-all"
							>
								<XIcon />
							</button>
						) : null}

						{state.txPending ? (
							<SignTranactionModal />
						) : !state.address || !modalValidator ? (
							<div>Invalid validator address</div>
						) : (
							<>
								{state.modal === "stake" ? (
									<StakeModal
										dispatch={dispatch}
										validator={modalValidator}
										bondedTokens={bondedTokens}
										apr={apr}
									/>
								) : state.modal === "details" ? (
									!modalDelegation ||
									!queryTotalRewards.data?.rewards ? (
										<div>Invalid delegation</div>
									) : (
										<DetailsModal
											dispatch={dispatch}
											validator={modalValidator}
											delegation={modalDelegation}
											rewards={
												queryTotalRewards.data.rewards
											}
										/>
									)
								) : state.modal === "redelegate" ? (
									queryValidators.data?.validators &&
									modalDelegation ? (
										<RedelegateModal
											delegation={modalDelegation}
											dispatch={dispatch}
											validator={modalValidator}
											validators={
												queryValidators.data.validators
											}
										/>
									) : (
										<div>No validators loaded</div>
									)
								) : null}
							</>
						)}
					</div>
				</Portal>
			) : null}
		</div>
	);
}
