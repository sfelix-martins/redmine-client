import { UpdateIssueParams } from './../../contracts/resources/issues';
import { objKeysFromCamelToSnakeCase } from '../../utils/case-converter';
import { BaseResource } from '../base-resource';

export class IssuesResource extends BaseResource {
  public async update(
    issueId: number,
    params: Partial<UpdateIssueParams>
  ): Promise<boolean> {
    const paramsSnakeCase = objKeysFromCamelToSnakeCase(params);

    const response = await this.api.put(`issues/${issueId}.json`, {
      issue: paramsSnakeCase,
    });

    return response.status === 200;
  }
}
