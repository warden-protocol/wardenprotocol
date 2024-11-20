export interface User {
  id: string;
  user_type: string;
  name: string;
  state: string;
  role?: string;
  external_id?: string;
  email?: string;
}
