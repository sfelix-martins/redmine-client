import { UpdateIssueParams } from '../../contracts/resources/issues';
import { BaseResource } from '../base-resource';

export class IssuesResource extends BaseResource {
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
