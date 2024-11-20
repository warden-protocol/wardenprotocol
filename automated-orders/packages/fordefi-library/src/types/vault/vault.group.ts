export interface VaultGroup {
  /** The unique identifier of the vault group in the Fordefi platform. */
  id: string;
  /** The name of the vault group. */
  name: string;
  /** The number of vaults in the group. */
  vault_count: number;
  /** Can the current user create or edit vaults in the group's based on the group permissions */
  can_current_user_create_or_edit_vaults: boolean;
}
