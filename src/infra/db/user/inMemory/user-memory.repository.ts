import { User, UserProps } from "@domain/user/user.entity";
import {
  UserRepositoryInterface,
  UserWithId,
} from "@domain/user/user.repository";

export class UserMemoryRepository implements UserRepositoryInterface {
  update(user: UserProps, id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  remove(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  private users: User[] = [];

  async getByUsername(username: string): Promise<UserWithId> {
    const user = this.users.find((user) => user.username === username);
    if (!user) throw new Error("User not found");

    return Promise.resolve(user.toJson());
  }

  async getByEmail(email: string): Promise<UserWithId> {
    const user = this.users.find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
    if (!user) throw new Error("User not found");

    return Promise.resolve(user.toJson());
  }

  async searchByName(partialName: string): Promise<UserWithId[]> {
    const users = this.users.filter((user) =>
      user.name.toLowerCase().includes(partialName.toLowerCase())
    );

    return Promise.resolve(users.map((user) => user.toJson()));
  }

  async create(user: User): Promise<void> {
    const exist = this.users.find(({ username, email }) => {
      return username === user.username || email === user.email;
    });
    if (!!exist) throw new Error("User alread exist");

    this.users = [...this.users, user];
  }

  async getAll(): Promise<UserWithId[]> {
    return Promise.resolve(this.users.map((user) => user.toJson()));
  }

  async count(): Promise<number> {
    return Promise.resolve(this.users.length);
  }
}
