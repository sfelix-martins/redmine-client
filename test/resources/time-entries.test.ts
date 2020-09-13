import axios from 'axios';

import { RedmineClient } from '../../src';
import { TimeEntriesResource } from '../../src/resources/time-entries/index';

jest.mock('axios');

const post = axios.post as jest.MockedFunction<typeof axios.post>;

describe('Time Entries Resource', () => {
  let resource: TimeEntriesResource;
  let client: RedmineClient;
  let host = 'http://localhost';
  let username = 'test';
  let password = 'secret';

  beforeAll(() => {
    client = new RedmineClient(host, { username, password });
    resource = new TimeEntriesResource(client);
  });

  describe('Create', () => {
    beforeEach(() => {
      post.mockReset();
    });

    describe('For issue', () => {
      it('should call API passing params', () => {
        const data = {
          hours: 1,
          issueId: 1,
          comments: 'Test',
          activityId: 1,
          spentOn: new Date(2020, 0, 1),
        };

        resource.create(data);
        expect(post).toHaveBeenCalledTimes(1);
        expect(post).toHaveBeenCalledWith(`time_entries.json`, {
          time_entry: {
            hours: data.hours,
            issue_id: data.issueId,
            comments: data.comments,
            activity_id: data.activityId,
            spent_on: '2020-01-01',
          },
        });
      });
    });

    describe('For project', () => {
      it('should call API passing params', () => {
        const data = {
          hours: 1,
          projectId: 1,
          comments: 'Test',
          activityId: 1,
          spentOn: new Date(2020, 2, 2),
        };

        resource.create(data);
        expect(post).toHaveBeenCalledTimes(1);
        expect(post).toHaveBeenCalledWith(`time_entries.json`, {
          time_entry: {
            hours: data.hours,
            project_id: data.projectId,
            comments: data.comments,
            activity_id: data.activityId,
            spent_on: '2020-03-02',
          },
        });
      });
    });
  });
});
