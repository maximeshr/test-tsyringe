import { injectable } from "tsyringe";
import Cache from "./cache";
import Logger from "./logger";

export type User = {
  name: string;
  age: number;
  gender: "male" | "female" | "neutral";
};

// This injectable means we are able to load it using container
// It will return a instance with all dependencies resolved!
// Note all arguments in the constructor must be resolved using tsyringe
@injectable()
class UserService {
  constructor(
    private cache: Cache,
    private logger: Logger,
  ) {}

  getUserByName(name: string): User | undefined {
    const user = this.cache.get(name);
    return user ? JSON.parse(user) : undefined;
  }

  createUser(user: User): User {
    this.cache.set(user.name, JSON.stringify(user));
    this.logger.debug("User has been created!");
    return user;
  }
}

export default UserService;
