import axios from 'axios';

import { RedmineClient } from '../../src';
import {
  ListTimeEntriesResponse,
  TimeEntry,
} from '../../src/contracts/resources/time-entries';
import { TimeEntriesResource } from '../../src/resources/time-entries/index';

jest.mock('axios');

const post = axios.post as jest.MockedFunction<typeof axios.post>;
const get = axios.get as jest.MockedFunction<typeof axios.get>;

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

  describe('List', () => {
    let mockTimeEntries: TimeEntry[] = [
      {
        hours: 1,
      },
      {
        hours: 2.33,
      },
    ];
    let timeEntriesResponse: ListTimeEntriesResponse;
    beforeAll(async () => {
      get.mockReturnValue(
        Promise.resolve({
          data: {
            time_entries: mockTimeEntries,
            total_count: 2,
            offset: 0,
            limit: 2,
          },
        })
      );
      timeEntriesResponse = await resource.list({
        from: new Date(2020, 9, 1),
        to: new Date(2020, 9, 1),
        userId: 'me',
      });
    });

    it('should call API passing params', () => {
      expect(get).toHaveBeenCalledTimes(1);
      expect(get).toHaveBeenCalledWith('time_entries.json', {
        params: {
          from: '2020-10-01',
          to: '2020-10-01',
          user_id: 'me',
        },
      });
    });

    it('should return time entries', () => {
      expect(timeEntriesResponse.timeEntries).toStrictEqual(mockTimeEntries);
    });

    it('should return the pagination data', () => {
      const { totalCount, offset, limit } = timeEntriesResponse;
      expect(totalCount).toBe(2);
      expect(offset).toBe(0);
      expect(limit).toBe(2);
    });
  });

  describe('Create', () => {
    beforeEach(() => {
      post.mockReset();
      post.mockReturnValue(Promise.resolve({ status: 201 }));
    });

    describe('For issue', () => {
      it('should call API passing params', async () => {
        const data = {
          hours: 1,
          issueId: 1,
          comments: 'Test',
          activityId: 1,
          spentOn: new Date(2020, 0, 1),
        };

        const created = await resource.create(data);

        expect(created).toBe(true);
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
      it('should call API passing params', async () => {
        const data = {
          hours: 1,
          projectId: 1,
          comments: 'Test',
          activityId: 1,
          spentOn: new Date(2020, 2, 2),
        };

        const created = await resource.create(data);
        expect(created).toBe(true);
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
