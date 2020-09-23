import axios from 'axios';

import { RedmineClient } from '../../src';
import {
  ListIssuesParams,
  ListIssuesResponse,
} from '../../src/contracts/resources/issues';
import { IssuesResource } from '../../src/resources/issues';

jest.mock('axios');

const put = axios.put as jest.MockedFunction<typeof axios.put>;
const get = axios.get as jest.MockedFunction<typeof axios.get>;

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

  describe('List', () => {
    let listIssuesResponse = {
      issues: [
        {
          id: 4512,
          project: {
            id: 43,
            name: 'Poppy Cofrinho Online',
          },
          tracker: {
            id: 4,
            name: 'Desenvolvimento',
          },
          status: {
            id: 3,
            name: 'Em Execução',
          },
          priority: {
            id: 2,
            name: 'Normal',
          },
          author: {
            id: 56,
            name: 'Samuel Felix Martins',
          },
          assigned_to: {
            id: 56,
            name: 'Samuel Felix Martins',
          },
          fixed_version: {
            id: 147,
            name: 'Sprint III -(24/08 até 14/09/2020)',
          },
          subject: 'Testes das funcionalidades da Sprint III',
          description: '',
          start_date: '2020-09-14',
          due_date: null,
          done_ratio: 0,
          is_private: false,
          estimated_hours: null,
          custom_fields: [
            {
              id: 9,
              name: 'Referência',
              value: '',
            },
            {
              id: 10,
              name: 'Nível de Complexidade',
              value: '',
            },
          ],
          created_on: '2020-09-14T08:24:03Z',
          updated_on: '2020-09-14T08:24:03Z',
          closed_on: null,
        },
      ],
      total_count: 1,
      offset: 0,
      limit: 1,
    };

    let mockListIssuesResponse: ListIssuesResponse = {
      issues: [
        {
          id: 4512,
          project: {
            id: 43,
            name: 'Poppy Cofrinho Online',
          },
          tracker: {
            id: 4,
            name: 'Desenvolvimento',
          },
          status: {
            id: 3,
            name: 'Em Execução',
          },
          priority: {
            id: 2,
            name: 'Normal',
          },
          author: {
            id: 56,
            name: 'Samuel Felix Martins',
          },
          assignedTo: {
            id: 56,
            name: 'Samuel Felix Martins',
          },
          fixedVersion: {
            id: 147,
            name: 'Sprint III -(24/08 até 14/09/2020)',
          },
          subject: 'Testes das funcionalidades da Sprint III',
          description: '',
          startDate: '2020-09-14',
          dueDate: null,
          doneRatio: 0,
          isPrivate: false,
          estimatedHours: null,
          customFields: [
            {
              id: 9,
              name: 'Referência',
              value: '',
            },
            {
              id: 10,
              name: 'Nível de Complexidade',
              value: '',
            },
          ],
          createdOn: '2020-09-14T08:24:03Z',
          updatedOn: '2020-09-14T08:24:03Z',
          closedOn: null,
        },
      ],
      totalCount: 1,
      offset: 0,
      limit: 1,
    };

    describe('Without params', () => {
      let response: ListIssuesResponse;
      beforeAll(async () => {
        get.mockReturnValue(Promise.resolve({ data: listIssuesResponse }));
        response = await resource.list();
      });

      it('should call API passing params', () => {
        expect(get).toHaveBeenCalledTimes(1);
        expect(get).toHaveBeenCalledWith('issues.json', { params: undefined });
      });

      it('should return time entries', () => {
        expect(mockListIssuesResponse).toStrictEqual(response);
      });
    });

    describe('With params', () => {
      let response: ListIssuesResponse;
      const params: ListIssuesParams = {
        assignedToId: 1,
        include: ['attachments', 'children'],
        issueId: 1,
        limit: 10,
        offset: 0,
        parentId: 10,
        projectId: 1,
        sort: 'issue_id:desc',
        statusId: 1,
        subprojectId: 2,
        trackerId: 32,
      };
      const parsedParams = {
        assigned_to_id: 1,
        include: ['attachments', 'children'],
        issue_id: 1,
        limit: 10,
        offset: 0,
        parent_id: 10,
        project_id: 1,
        sort: 'issue_id:desc',
        status_id: 1,
        subproject_id: 2,
        tracker_id: 32,
      };
      beforeAll(async () => {
        get.mockReset();

        get.mockReturnValue(Promise.resolve({ data: listIssuesResponse }));
        response = await resource.list(params);
      });

      it('should call API passing params', () => {
        expect(get).toHaveBeenCalledTimes(1);
        expect(get).toHaveBeenCalledWith('issues.json', {
          params: parsedParams,
        });
      });

      it('should return time entries', () => {
        expect(mockListIssuesResponse).toStrictEqual(response);
      });
    });
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
