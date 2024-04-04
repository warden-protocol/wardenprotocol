// import Intents from "@/components/intents";
import NewIntentButton from "@/components/new-intent-button";
import { useState } from "react";
import CreateIntent from "../components/create-intent";
import CreateIntentModal from "@/components/create-intent-modal";

const INTENTS_USERS = [
	"0xD35dFbA4E4Cf21F56E2E7bC6fDb2c6A5C2410df8",
	"0x125dED591Ba933eEB6dFbEea0e40635d3E361344",
	"0x019e88133f35D8B5141D0780dC600502F67Fc079",
	"0xb31baE040758b4EcE61812F714dc603A119eE17a",
	"0xD35dFbA4E4Cf21F56E2E7bC6fDb2c6A5C2410df8",
	"0x125dED591Ba933eEB6dFbEea0e40635d3E361344",
];

export type ConditionType = "joint" | `group:${number}` | "anyone";

export interface Intent {
	id: number;
	name: string;
	addresses: string[];
	conditions: { type: ConditionType; group: string[] }[];
	operators: ("and" | "or")[];
}

function IntentsPage() {
	const [isCreateModal, setIisCreateModal] = useState(false);

	const [intents, setIntents] = useState<Intent[]>([]);

	const handleCreateIntent = (name: string, condition: ConditionType) => {
		const newItem: Intent = {
			id: Math.random() * 100,
			name: name,
			conditions: [{ type: condition, group: [] }],
			addresses: INTENTS_USERS,
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

	const handleRemoveCondition = (id: number, conditionIndex: number) => {
		const index = intents.findIndex((x) => x.id === id);
		if (index < 0) {
			throw new Error("intent not found");
		}
		const newIntentsArray = [...intents];
		const conditionsArray = [...newIntentsArray[index].conditions];
		conditionsArray.splice(conditionIndex, 1);
		newIntentsArray[index].conditions = conditionsArray;
		setIntents(newIntentsArray);
	};

	// const clickConditionAddress = (
	// 	id: number,
	// 	conditionName: string,
	// 	clickedAddress: string,
	// ) => {
	// 	const index = intents.findIndex((x) => x.id === id);
	// 	if (index < 0) {
	// 		throw new Error("intent not found");
	// 	}
	// 	const newIntentsArray = [...intents];
	// 	const conditionArray = [
	// 		...newIntentsArray[index].conditions[conditionName],
	// 	];

	// 	if (conditionArray.indexOf(clickedAddress) !== -1) {
	// 		conditionArray.filter((address) => address !== clickedAddress);
	// 	} else {
	// 		conditionArray.push(clickedAddress);
	// 	}

	// 	newIntentsArray[index].conditions[conditionName] = conditionArray;
	// 	setIntents(newIntentsArray);
	// };

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
					<CreateIntent
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
