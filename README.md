<h1 align="center">Welcome to Node Redmine API Client 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <img src="https://img.shields.io/badge/node-%3E%3D10-blue.svg" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> A NodeJS API client to Redmine REST API

## Prerequisites

- node >=10

## Install

```sh
yarn add @smartinsf/redmine-client
```

## Usage

Create an instance of `RedmineClient` to access the resources. E.g.:

```ts
import { RedmineClient } from '@smartinsf/redmine-client';

// Create an instance passing your Redmine host and the username and password credentials
// Only Basic authentication is supported for now
const client = new RedmineClient('http://redmine.yourhost.com', {
  username: 'test',
  password: 'secret',
});
```

### Resources

All resources accepts the params from [Redmine docs](https://www.redmine.org/projects/redmine/wiki/Rest_Issues#Updating-an-issue) in camelCase.

#### Issues

```ts
// Updating an issue
const issue = 123;
const params = {
  statusId: 1,
};
client.issues().update(issue, params);
```

#### Time Entries

```ts
// Listing time entries
const listParams = {
  offset: 1,
  limit: 100,
  projectId: 10,
  from: new Date(2020, 1, 1),
  to: new Date(2020, 1, 1),
  userId: 'me',
};
const timeEntries = client.timeEntries().list(listParams);

// Time entry creation
const params = {
  spentOn: new Date(2020, 2, 2),
  hours: 1,
  activityId: 2,
  comments: 'Testing redmine client',
  issueId: 10,
};
client.timeEntries().create(params);
```

## Links

Redmine wiki page: http://www.redmine.org/projects/redmine/wiki/Rest_api

## Author

👤 **Samuel Martins**

- Github: [@sfelix-martins](https://github.com/sfelix-martins)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/sfelix-martins/redmine-client/issues).

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
