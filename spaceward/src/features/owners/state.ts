import { createPersistantState } from "@/hooks/state";

export interface OwnerUserSettings {
	name: string;
}

export interface OwnerUserState {
	settings: Record<string, OwnerUserSettings | undefined>;
}

export const useOwnerSettingsState = createPersistantState<OwnerUserState>(
	"owner-user-settings",
	{
		settings: {},
	},
);
