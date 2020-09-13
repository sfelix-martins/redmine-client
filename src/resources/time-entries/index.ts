import {
  CreateTimeEntryParams,
  ListTimeEntriesParams,
} from '../../contracts/resources/time-entrires';
import { BaseResource } from '../base-resource';

export class TimeEntriesResource extends BaseResource {
  public async list(params: ListTimeEntriesParams) {
    params = this.prepareParams(params);

    const { data } = await this.api.get('time_entries.json', {
      params,
    });

    return data;
  }

  public async create(params: CreateTimeEntryParams) {
    params = this.prepareParams(params);

    const response = await this.api.post(`time_entries.json`, {
      time_entry: params,
    });

    return response.status === 201;
  }
}
