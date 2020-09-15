import { NotParsePagination, Pagination } from '../../pagination.interface';
import { Issue, NotParsedIssue } from './issue.interface';

export interface ListIssuesResponse extends Pagination {
  issues: Issue[];
}

export interface NotParsedListIssuesResponse extends NotParsePagination {
  issues: NotParsedIssue[];
}
