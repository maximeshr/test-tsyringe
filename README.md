# A project to demonstrate how to use DI (dependency injection) using [`tsyringe`](https://github.com/microsoft/tsyringe)

## How to?
- Run `yarn` to install dependencies
- Run `yarn ts-node src/app.ts` to start the application
- Run `yarn test` to run unit tests

## Questions?
- How can I display my logs during unit tests?

You need to overwrite function `areTestsRunning` in `Logger` class.
