# CRUD API

## Description

Implementation of a simple CRUD API using in-memory database underneath

### Use 20^ LTS version of Node.js.

```bash
$ node --version
```

### Install dependencies

```bash
$ npm install
```

### Scripts to run

```bash
# Development mode
$ npm run start:dev
```

```bash
# Production mode
$ npm run start:prod
```

### CRUD & Endpoints

| methods | URL                                       |
| :-----: | ----------------------------------------- |
|   GET   | http://localhost:4000/api/users           |
|   GET   | http://localhost:4000/api/users/{:userId} |
|  POST   | http://localhost:4000/api/users           |
|   PUT   | http://localhost:4000/api/users/{:userId} |
| DELETE  | http://localhost:4000/api/users/{:userId} |

---

## Technical requirements

- Task can be implemented on Javascript or Typescript
- Only
  - `nodemon`,
  - `dotenv`,
  - `cross-env`,
  - `typescript`,
  - `ts-node`, `ts-node-dev`,
  - `eslint` and its plugins,
  - `webpack-cli`, `webpack` and its plugins,
  - `prettier`,
  - `uuid`,
  - `@types/*` as well as libraries used for testing are allowed
- Prefer asynchronous API whenever possible

## Implementation details

1. Implemented endpoint api/users:

- **GET** `api/users` is used to **GET** all persons
  - Server should answer with `status code` **200** and all users records
- **GET** `api/users/{userId}`
  - Server should answer with `status code` **200** and record with `id === userId` if it exists
  - Server should answer with `status code` **400** and corresponding message if userId is invalid (not uuid)
  - Server should answer with `status code` **404
    ** and corresponding message if record with `id === userId` doesn't exist
- **POST** `api/users` is used to create record about new user and store it in database
  - Server should answer with `status code` **201** and newly created record
  - Server should answer with `status code` **400
    ** and corresponding message if request body does not contain required fields
- **PUT** `api/users/{userId}` is used to update existing user
  - Server should answer with `status code` **200** and updated record
  - Server should answer with `status code` **400** and corresponding message if userId is invalid (not `uuid`)
  - Server should answer with `status code` **404
    ** and corresponding message if record with `id === userId` doesn't exist
- **DELETE** `api/users/{userId}` is used to **DELETE** existing user from database
  - Server should answer with `status code` **204** if the record is found and **DELETE**d
  - Server should answer with `status code` **400** and corresponding message if userId is invalid (not `uuid`)
  - Server should answer with `status code` **404
    ** and corresponding message if record with `id === userId` doesn't exist

2. Users are stored as objects that have following properties:

- `id` — unique identifier (string, `uuid`) generated on server side
- `username` — user's name (string, required)
- `age` — user's age (number, required)
- `hobbies` — user's hobbies (array of strings or empty array, required)

3. Requests to non-existing endpoints (e.g. some-non/existing/resource) should be handled (server should answer with `status code`
   **404** and corresponding human-friendly message)
4. Errors on the server side that occur during the processing of a request should be handled and processed correctly (server should answer with `status code`
   **500** and corresponding human-friendly message)
5. Value of port on which application is running should be stored in .env file
6. There should be 2 modes of running application (development and production):

- The application is run in development mode using `nodemon` or ts-node-dev (there is a npm script start:dev)
- The application is run in production mode (there is a npm script start:prod that starts the build process and then runs the bundled file)
