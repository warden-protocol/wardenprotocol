import { User } from '../user.js';

export interface VaultRef {
  id: string;
  name: string;
  address?: string;
  state: string;
  end_user?: User;
}
