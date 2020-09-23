import {
  CreateTimeEntryParams,
  ListTimeEntriesParams,
  ListTimeEntriesResponse,
  NotParsedListTimeEntriesResponse,
} from '../../contracts/resources/time-entries';
import { BaseResource } from '../base-resource';

export class TimeEntriesResource extends BaseResource {
  public async list(
    params: ListTimeEntriesParams
  ): Promise<ListTimeEntriesResponse> {
    params = this.prepareParams(params);

    const { data } = await this.api.get<NotParsedListTimeEntriesResponse>(
      'time_entries.json',
      {
        params,
      }
    );

    const { time_entries, total_count, ...rest } = data;

    return {
      ...rest,
      timeEntries: time_entries,
      totalCount: total_count,
    };
  }

  public async create(params: CreateTimeEntryParams) {
    params = this.prepareParams(params);

    const response = await this.api.post(`time_entries.json`, {
      time_entry: params,
    });

    return response.status === 201;
  }
}
