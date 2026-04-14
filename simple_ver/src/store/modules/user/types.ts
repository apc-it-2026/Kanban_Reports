export type RoleType = '' | '*' | 'admin' | 'user';
export interface UserState {
  name?: string;
  role: string;
  code?: string;
  qq?: string;
}
