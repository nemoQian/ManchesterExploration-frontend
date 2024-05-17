export type RoleType = -1 | 0 | 1;
export interface UserState {
  token?: string;
  id: number;
  username: string;
  nickname?: string;
  gender?: string | number;
  avatarUrl?: string;
  phone?: string;
  email?: string;
  createTime: string;
  updateTime: string;
  tags: string[];
  userRole: RoleType;
}
