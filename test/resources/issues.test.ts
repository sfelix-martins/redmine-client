import axios from 'axios';

import { RedmineClient } from '../../src';
import { IssuesResource } from './../../src/resources/issues/index';

jest.mock('axios');

const put = axios.put as jest.MockedFunction<typeof axios.put>;

describe('Issues Resource', () => {
  let resource: IssuesResource;
  let client: RedmineClient;
  let host = 'http://localhost';
  let username = 'test';
  let password = 'secret';

  beforeAll(() => {
    client = new RedmineClient(host, { username, password });
    resource = new IssuesResource(client);
  });

  describe('Update', () => {
    it('should call API passing params', () => {
      const issueId = 1;
      const statusId = 1;

      resource.update(issueId, { statusId });
      expect(put).toHaveBeenCalledTimes(1);
      expect(put).toHaveBeenCalledWith(`issues/${issueId}.json`, {
        issue: {
          status_id: statusId,
        },
      });
    });
  });
});
