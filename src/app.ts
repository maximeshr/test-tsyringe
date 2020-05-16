import "reflect-metadata"; // this is a mandatory import to use decorators!
import { container } from "tsyringe";
import Logger from "./logger";
import Cache from "./cache";
import UserService, { User } from "./user";

// We are resolving our class instances
const logger = container.resolve(Logger);
const cache = container.resolve(Cache);
const userService = container.resolve(UserService);

logger.debug("Hello World!");

const hasBeenAdded = cache.set("foo", "bar");

logger.debug("has been added? (void fn)", hasBeenAdded);

const cached = cache.get("foo");

logger.debug("cached:", cached);

const user: User = {
  name: "Maxime",
  age: 30,
  gender: "male",
};

userService.createUser(user);

logger.debug(userService.getUserByName("Maxime"));
logger.debug(userService.getUserByName("Johnn"));
