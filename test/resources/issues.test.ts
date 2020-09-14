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
    describe('Returning success response', () => {
      const issueId = 1;
      const statusId = 1;
      let updated: boolean;
      beforeAll(async () => {
        put.mockReturnValue(Promise.resolve({ status: 200 }));

        updated = await resource.update(issueId, { statusId });
      });

      it('should return true response', () => {
        expect(updated).toBe(true);
      });

      it('should call API passing params', () => {
        expect(put).toHaveBeenCalledTimes(1);
        expect(put).toHaveBeenCalledWith(`issues/${issueId}.json`, {
          issue: {
            status_id: statusId,
          },
        });
      });
    });
  });
});
