// import Intents from "@/components/intents";
import NewIntentButton from "@/components/new-intent-button";
import { useMemo, useState } from "react";
import IntentComponent from "../components/intent";
import CreateIntentModal from "@/components/create-intent-modal";
import { useSpaceId } from "@/hooks/useSpaceId";
import useWardenWardenV1Beta2 from "@/hooks/useWardenWardenV1Beta2";
import useWardenIntent from "@/hooks/useWardenIntent";
import jsep, {
	type ArrayExpression,
	type BinaryExpression,
	type CallExpression,
	type Identifier,
	type Literal,
} from "jsep";

export type ConditionType = "joint" | `group:${number}` | "anyone";

export interface Intent {
	id: number;
	name: string;
	conditions: { type: ConditionType; group: string[] }[];
	operators: ("and" | "or")[];
}

const tmpIntent = "all([ward1, ward2]) || any(2, [ward3, ward4, ward5])";

const createDefinition = (intent: Intent) => {
	const conditions = intent.conditions.map((condition) => {
		const { type, group } = condition;

		if (type === "joint") {
			return `all([${group.join(", ")}])`;
		} else if (type === "anyone") {
			return `any(1, [${group.join(", ")}])`;
		} else {
			return `any(${type.split(":")[1]}, [${group.join(", ")}])`;
		}
	});

	let result = "";

	for (let i = 0; i < conditions.length; i++) {
		if (i) {
			result += ` ${intent.operators[i - 1]} `;
		}

		result += conditions[i];
	}

	return result;
};

const parseSimpleIntent = (intent: string) => {
	const operators: ("and" | "or")[] = [];

	const conditions: {
		type: ConditionType;
		group: string[];
	}[] = [];

	const root = jsep(intent);
	const stack = [root];

	while (stack.length) {
		const current = stack.pop();

		if (!current) {
			break;
		}

		if (current.type === "BinaryExpression") {
			const { operator, left, right } = current as BinaryExpression;

			if (operator === "||") {
				operators.push("or");
			} else {
				operators.push("and");
			}

			stack.push(left);
			stack.push(right);
		} else if (current.type === "CallExpression") {
			const { arguments: args, callee } = current as CallExpression;

			if (callee.type !== "Identifier") {
				throw new Error(
					`Invalid identifier: ${JSON.stringify(callee)}`,
				);
			}

			const { name } = callee as Identifier;

			if (name === "all") {
				if (args.length !== 1) {
					throw new Error(
						`Invalid arguments: ${JSON.stringify(args)}`,
					);
				}

				const [addresses] = args;

				if (addresses.type !== "ArrayExpression") {
					throw new Error(
						`Invalid array expression: ${JSON.stringify(addresses)}`,
					);
				}

				const { elements } = addresses as ArrayExpression;

				const condition = "joint";
				const group = elements.map((element) => {
					if (element.type !== "Identifier") {
						throw new Error(
							`Invalid identifier: ${JSON.stringify(element)}`,
						);
					}

					const { name } = element as Identifier;
					return name;
				});

				conditions.push({ type: condition, group });
			} else if (name === "any") {
				if (args.length !== 2) {
					throw new Error(
						`Invalid arguments: ${JSON.stringify(args)}`,
					);
				}

				const [threshold, addresses] = args;

				if (threshold.type !== "Literal") {
					throw new Error(
						`Invalid literal: ${JSON.stringify(threshold)}`,
					);
				}

				const value = (threshold as Literal).value;

				if (typeof value !== "number") {
					throw new Error(`Invalid number: ${value}`);
				}

				const condition = (
					value === 1 ? "anyone" : `group:${value}`
				) as "anyone" | `group:${number}`;

				if (addresses.type !== "ArrayExpression") {
					throw new Error(
						`Invalid array expression: ${JSON.stringify(addresses)}`,
					);
				}

				const { elements } = addresses as ArrayExpression;
				const group = elements.map((element) => {
					if (element.type !== "Identifier") {
						throw new Error(
							`Invalid identifier: ${JSON.stringify(element)}`,
						);
					}

					const { name } = element as Identifier;
					return name;
				});

				conditions.push({ type: condition, group });
			} else {
				throw new Error(`Invalid function: ${name}`);
			}
		} else {
			continue;
		}
	}

	return {
		operators,
		conditions,
	};
};

const useIntents = () => {
	const { spaceId } = useSpaceId();
	const { QuerySpaceById } = useWardenWardenV1Beta2();
	const { QueryIntents } = useWardenIntent();
	const space = QuerySpaceById({ id: spaceId }, {}).data?.space;
	const intents = QueryIntents({ creator: space?.creator }, {}, 100);

	if (!intents.isFetchingNextPage && intents.hasNextPage) {
		intents.fetchNextPage();
	}

	/** @deprecated would be nice to query intent by creator or space */
	const intentsBySpace = useMemo(
		() =>
			intents.data?.pages.flatMap((x) =>
				x.intents?.filter(
					(intent) => intent.creator === space?.creator,
				),
			),
		[intents.data?.pages, space?.creator],
	);

	console.log("!!!", {
		space,
		intents,
		intentsBySpace,
		intent: parseSimpleIntent(tmpIntent),
	});
};

function IntentsPage() {
	useIntents();
	const [isCreateModal, setIisCreateModal] = useState(false);

	const [intents, setIntents] = useState<Intent[]>([]);
	console.log(intents.map(createDefinition));

	const handleCreateIntent = (name: string, condition: ConditionType) => {
		const newItem: Intent = {
			id: Math.random() * 100,
			name: name,
			conditions: [{ type: condition, group: [] }],
			operators: [],
		};
		const newIntentsArray = [...intents];
		newIntentsArray.push(newItem);
		setIntents(newIntentsArray);
	};

	const handleChangeIntent = (id: number, newCondition: ConditionType) => {
		const index = intents.findIndex((x) => x.id === id);
		if (index < 0) {
			throw new Error("intent not found");
		}
		const newIntentsArray = [...intents];
		newIntentsArray[index].conditions.push({
			type: newCondition,
			group: [],
		});
		setIntents(newIntentsArray);
	};

	const handleRemoveCondition = (
		id: number,
		conditionToRemove: ConditionType,
	) => {
		const index = intents.findIndex((x) => x.id === id);
		if (index < 0) {
			throw new Error("intent not found");
		}
		const newIntentsArray = [...intents];
		const conditionsArray = [...newIntentsArray[index].conditions];
		const conditionsArrayChanged = conditionsArray.filter(
			(condition) => condition.type !== conditionToRemove,
		);
		newIntentsArray[index].conditions = conditionsArrayChanged;
		setIntents(newIntentsArray);
	};

	const onIntentRemove = (id: number) => {
		const newIntentsArray = intents.filter((item) => item.id !== id);
		setIntents(newIntentsArray);
	};

	return (
		<div className="flex flex-col flex-1 h-full px-8 py-4 space-y-8">
			<div className="flex items-center justify-between pb-4 space-y-2">
				<div>
					<h2 className="text-4xl">Intents</h2>
					<p className="text-muted-foreground hidden xl:block">
						Rules that define who can operate or use its keys to
						generate and sign transactions.
					</p>
				</div>
				<div>
					<NewIntentButton onClick={() => setIisCreateModal(true)} />
				</div>
			</div>

			{isCreateModal && (
				<CreateIntentModal
					onClose={() => setIisCreateModal(false)}
					handleCreateIntent={handleCreateIntent}
				/>
			)}

			{intents.length ? (
				intents.map((intent, key) => (
					<IntentComponent
						intent={intent}
						key={key}
						onIntentRemove={onIntentRemove}
						handleChangeIntent={handleChangeIntent}
						handleRemoveCondition={handleRemoveCondition}
					/>
				))
			) : (
				<div>
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-[rgba(255,174,238,0.15)] rounded-full flex items-center justify-center text-[#FFAEEE] text-xl">
							1
						</div>
						<p className="flex items-center gap-2">
							Create an Intent by pressing &#39;Create&#39; button
							<svg
								width="12"
								height="11"
								viewBox="0 0 12 11"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M6.60227 11L5.72727 10.1364L9.32955 6.53409H0V5.28409H9.32955L5.72727 1.69318L6.60227 0.818182L11.6932 5.90909L6.60227 11Z"
									fill="white"
								/>
							</svg>
						</p>
					</div>

					<div className="flex items-center gap-3 mt-10">
						<div className="w-10 h-10 bg-[rgba(255,174,238,0.15)] rounded-full flex items-center justify-center text-[#FFAEEE] text-xl">
							2
						</div>
						<p className="flex items-center gap-2">
							Select an approval condition
						</p>
					</div>

					<div className="flex items-center gap-3 mt-10">
						<div className="w-10 h-10 bg-[rgba(255,174,238,0.15)] rounded-full flex items-center justify-center text-[#FFAEEE] text-xl">
							3
						</div>
						<p className="flex items-center gap-2">Have fun</p>
					</div>
				</div>
			)}

			{/* <Intents /> */}
		</div>
	);
}

export default IntentsPage;
