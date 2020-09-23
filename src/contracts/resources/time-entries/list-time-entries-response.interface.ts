import { NotParsePagination, Pagination } from '../../pagination.interface';
import { TimeEntry } from './time-entry.interface';

export interface ListTimeEntriesResponse extends Pagination {
  timeEntries: TimeEntry[];
}

export interface NotParsedListTimeEntriesResponse extends NotParsePagination {
  time_entries: TimeEntry[];
}
