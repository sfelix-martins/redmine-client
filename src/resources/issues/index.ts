import {
  Issue,
  ListIssuesParams,
  ListIssuesResponse,
  NotParsedListIssuesResponse,
  UpdateIssueParams,
} from '../../contracts/resources/issues';
import { objKeysFromSnakeToCamelCase } from '../../utils/case-converter';
import { BaseResource } from '../base-resource';

export class IssuesResource extends BaseResource {
  public async list(params?: ListIssuesParams): Promise<ListIssuesResponse> {
    if (params) {
      params = this.prepareParams(params);
    }

    const { data } = await this.api.get<NotParsedListIssuesResponse>(
      'issues.json',
      {
        params,
      }
    );

    const issues = data.issues.map(issue =>
      objKeysFromSnakeToCamelCase<Issue>(issue)
    );

    return {
      issues,
      totalCount: data.total_count,
      limit: data.limit,
      offset: data.offset,
    };
  }

  public async update(
    issueId: number,
    params: Partial<UpdateIssueParams>
  ): Promise<boolean> {
    params = this.prepareParams(params);

    const response = await this.api.put(`issues/${issueId}.json`, {
      issue: params,
    });

    return response.status === 200;
  }
}
