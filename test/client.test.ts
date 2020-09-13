import { RedmineClient } from '../src';
import { RedmineClientConfig } from '../src/contracts/redmine-client-config.interface';
import { IssuesResource } from '../src/resources/issues/index';
import { TimeEntriesResource } from '../src/resources/time-entries/index';

describe('Client', () => {
  const host = 'http://localhost';
  const config: RedmineClientConfig = {
    username: 'test',
    password: 'secret',
  };
  let client: RedmineClient;

  beforeAll(() => {
    client = new RedmineClient(host, config);
  });

  describe('Create an instance', () => {
    it('should defined API base url', () => {
      expect(client.api.defaults.baseURL).toBe(host);
    });

    it('should define API basic auth credentials', () => {
      expect(client.api.defaults.auth).toStrictEqual(config);
    });
  });

  describe('Get issues resource', () => {
    it('should return an instance of IssueResource', () => {
      expect(client.issues()).toBeInstanceOf(IssuesResource);
    });
  });

  describe('Get time entries resource', () => {
    it('should return an instance of TimeEntriesResource', () => {
      expect(client.timeEntries()).toBeInstanceOf(TimeEntriesResource);
    });
  });
});
