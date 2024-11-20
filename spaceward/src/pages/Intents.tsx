import { CreateIntentModal, Intent } from "@/features/intents";
import { ConditionType, IntentParams, SimpleIntent } from "@/types/intent";
import { Expression } from "@/types/shield";
import { getSimpleIntent } from "@/utils/shield";
import { isSet } from "@/utils/validate";
import { useCallback, useMemo, useState } from "react";
import { FilePlus2 } from "lucide-react";
import { useRules } from "@/features/intents/hooks";
import { toast } from "@/components/ui/use-toast";


export function IntentsPage() {
	const { newRule, updateRule, rulesBySpace, activeRuleId, setActiveRule } =
		useRules();
	const [isCreateModal, setIsCreateModal] = useState(false);
	const [_rules, setRules] = useState<SimpleIntent[]>([]);

	const rules = useMemo(() => {
		if (!rulesBySpace) {
			return _rules;
		}

		const parsedRules = rulesBySpace
			.map((rule) => {
				// fixme get correct type from api
				const expression =
					(rule as { expression?: Expression })?.expression ?? {};

				if (!rule?.id) {
					return undefined;
				}

				try {
					return {
						id: rule.id ? Number(rule.id) : undefined,
						...getSimpleIntent(rule.name ?? "", expression),
					};
				} catch (e) {
					// if incorrect definition
					console.error(e);
					return undefined;
				}
			})
			.filter(isSet)
			.sort((a, b) => (b.id as number) - (a.id as number));

		return [..._rules, ...parsedRules];
	}, [_rules, rulesBySpace]);

	const onRuleCreate = useCallback(
		(name: string, condition: ConditionType) => {
			const newItem: SimpleIntent = {
				name: name,
				conditions: [{ type: condition, group: [], expression: {} }],
				addresses: [],
				operators: [],
				raw: {},
			};

			const newRulesArray = [..._rules];
			newRulesArray.push(newItem);
			setRules(newRulesArray);
		},
		[_rules],
	);

	const onRuleRemove = useCallback(
		(_index: number) => {
			const nextRules = [
				..._rules.filter((_, index) => index !== _index),
			];

			setRules(nextRules);
		},
		[_rules],
	);

	const onRuleSave = useCallback(
		async ({ simple, advanced }: IntentParams) => {
			const fn = simple?.id || advanced?.id ? updateRule : newRule;
			await fn({ simple, advanced });
		},
		[updateRule, newRule],
	);

	return (
		<div className="flex flex-col flex-1 px-8 py-4 space-y-8">
			<div className="flex items-center pb-4 space-x-6">
				<div>
					<h2 className="text-5xl font-bold">Rules</h2>
					{/* <p className="text-muted-foreground hidden xl:block text-sm">
						Rules that define who can operate or use its keys to
						generate and sign transactions.
					</p> */}
				</div>
			</div>

			{isCreateModal && (
				<CreateIntentModal
					index={-1}
					onClose={() => setIsCreateModal(false)}
					handleCreateIntent={onRuleCreate}
					length={rules.length}
				/>
			)}
			{rules.length ? (
				<div className="flex flex-row space-x-4">
					<div className="w-full xl:w-8/12 flex flex-col space-y-4">
						{rules.map((rule, index) => (
							<Intent
								isActive={activeRuleId === rule.id}
								intent={rule}
								index={index}
								key={
									rule.id ? rule.id : `${rule.name}:${index}`
								}
								onIntentRemove={onRuleRemove}
								onIntentSave={onRuleSave}
								onIntentToggle={async () => {
									if (!rule.id) {
										return;
									}

									const nextActiveRuleId = activeRuleId === rule.id
										? 0
										: rule.id;

									try {
										await setActiveRule(nextActiveRuleId);
									} catch (e) {
										console.error(e);
										toast({
											title: "Failed to set active rule",
											description: (e as Error)?.message ?? "Unknown error",
											variant: "destructive",
										});
									}
								}}
							/>
						))}
						<div
							className="w-full bg-card sticky cursor-pointer rounded-xl p-8 flex items-center justify-center border-card border-2 hover:border-foreground"
							onClick={() => setIsCreateModal(true)}
						>
							<div className="flex space-x-4 items-center justify-center h-full">
								<FilePlus2
									strokeWidth={1}
									className="h-8 w-8 text-foreground"
								/>
								<p className="text-base">Create a new rule</p>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="grid xl:grid-cols-2 gap-4">
					<div className="w-full flex flex-col space-y-4">
						<div className="bg-card rounded-xl p-8">
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 bg-fill-accent-secondary rounded-full flex items-center justify-center text-label-accent text-xl">
									1
								</div>
								<p className="flex items-center gap-2">
									Create a rule by pressing &#39;Create&#39;
									button
								</p>
							</div>

							<div className="flex items-center gap-3 mt-10">
								<div className="w-10 h-10 bg-fill-accent-secondary rounded-full flex items-center justify-center text-label-accent text-xl">
									2
								</div>
								<p className="flex items-center gap-2">
									Select an approval condition
								</p>
							</div>

							<div className="flex items-center gap-3 mt-10">
								<div className="w-10 h-10 bg-fill-accent-secondary rounded-full flex items-center justify-center text-label-accent text-xl">
									3
								</div>
								<p className="flex items-center gap-2">
									Add the approvers
								</p>
							</div>
						</div>
					</div>
					<div className="w-full h-full flex">
						<div
							className="w-full bg-card sticky cursor-pointer rounded-xl p-8 flex items-center justify-center border-card border-2 hover:border-foreground"
							onClick={() => setIsCreateModal(true)}
						>
							<div className="flex space-x-4 items-center justify-center h-full">
								<FilePlus2
									strokeWidth={1}
									className="h-8 w-8 text-foreground"
								/>
								<p className="text-base">Create a new rule</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
