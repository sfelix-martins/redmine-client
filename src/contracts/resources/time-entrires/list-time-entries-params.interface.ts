import { ListParams } from '../list-params.interface';

export interface ListTimeEntriesParams extends ListParams {
  projectId?: number;
  from: Date;
  to: Date;
  userId: number | 'me';
}
