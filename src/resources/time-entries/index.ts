import {
  CreateTimeEntryParams,
  ListTimeEntriesParams,
  ListTimeEntriesResponse,
} from '../../contracts/resources/time-entries';
import { TimeEntry } from '../../contracts/resources/time-entries/time-entry.interface';
import { BaseResource } from '../base-resource';

export class TimeEntriesResource extends BaseResource {
  public async list(params: ListTimeEntriesParams): Promise<TimeEntry[]> {
    params = this.prepareParams(params);

    const { data } = await this.api.get<ListTimeEntriesResponse>(
      'time_entries.json',
      {
        params,
      }
    );

    return data.time_entries;
  }

  public async create(params: CreateTimeEntryParams) {
    params = this.prepareParams(params);

    const response = await this.api.post(`time_entries.json`, {
      time_entry: params,
    });

    return response.status === 201;
  }
}
