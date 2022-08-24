import { UserProps } from "./user.entity";

export type UserWithId = UserProps & { id: string };

export interface UserRepositoryInterface {
  create(user: UserProps): Promise<void>;
  getByUsername(username: string): Promise<UserWithId>;
  getByEmail(email: string): Promise<UserWithId>;
  searchByName(partialName: string): Promise<UserWithId[]>;
}
