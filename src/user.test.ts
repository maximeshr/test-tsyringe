import UserService, { User } from "./user";
import Cache from "./cache";
import { container } from "tsyringe";

// We are mocking the cache module using Jest directly
jest.mock("./cache");

// Mock function to return a new User object
function mockUser(): User {
  return {
    name: "foo",
    age: 123,
    gender: "neutral",
  };
}

// Mock Cache class - this will be useful to mock methods and set in di container
const MockedCache = <jest.Mock<Cache>> Cache;

beforeEach(() => {
  // As we are using mocked instance of dependencies class
  // We need to clear all instances before each test
  container.clearInstances();
});

describe("UserService", () => {
  it("should create a user and return it after creation", () => {
    const mockedUser = mockUser();
    const mockedCache = new MockedCache();

    mockedCache.set = jest.fn(); // set is now a jest function: https://jestjs.io/docs/en/mock-function-api

    container.registerInstance(Cache, mockedCache); // We overwrite the Cache by our mocked instance

    const userService = container.resolve(UserService);

    const hasBeenInserted = userService.createUser(mockedUser);

    expect(hasBeenInserted.name).toBe("foo");
    expect(hasBeenInserted.age).toBe(123);
    expect(hasBeenInserted.gender).toBe("neutral");
    expect(mockedCache.set).toHaveBeenCalledTimes(1);
    expect(mockedCache.set).toHaveBeenCalledWith(
      "foo",
      JSON.stringify(mockedUser),
    );
  });

  it("should return a valid user", () => {
    const mockedUser = mockUser();
    const mockedCache = new MockedCache();

    // This will be returned when userService will call this.cache.get
    mockedCache.get = jest.fn().mockReturnValue(JSON.stringify(mockedUser));

    container.registerInstance(Cache, mockedCache);

    const userService = container.resolve(UserService);

    const user = (userService.getUserByName("foo")) as User;

    expect(user.name).toBe("foo");
    expect(user.age).toBe(123);
    expect(user.gender).toBe("neutral");
    expect(mockedCache.get).toHaveBeenCalledTimes(1);
    expect(mockedCache.get).toHaveBeenCalledWith("foo");
  });

  it("should return undefined if user does not exist", () => {
    const mockedUser = mockUser();
    const mockedCache = new MockedCache();

    mockedCache.get = jest.fn().mockReturnValue(undefined);

    container.registerInstance(Cache, mockedCache);

    const userService = container.resolve(UserService);

    const user = (userService.getUserByName("foo")) as User;

    expect(user).toBeUndefined();
    expect(mockedCache.get).toHaveBeenCalledTimes(1);
    expect(mockedCache.get).toHaveBeenCalledWith("foo");
  });
});
