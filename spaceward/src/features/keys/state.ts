import { createPersistantState } from "@/hooks/state";

export const TEMP_KEY = "temp";

export interface KeyUserSettings {
	name: string;
	themeIndex: number;
}

export interface KeyUserState {
	settings: Record<string, KeyUserSettings | undefined>;
	view: "list" | "card";
}

export const useKeySettingsState = createPersistantState<KeyUserState>(
	"key-user-settings",
	{
		settings: {},
		view: "card",
	},
);
