import { ListParams } from '../list-params.interface';

export interface ListIssuesParams extends ListParams {
  sort?: string;
  include?: ('attachments' | 'relations' | 'journals' | 'children')[];
  issueId?: number | string;
  asignedToId?: number | 'me';
  statusId?: number;
  projectId?: number;
  subprojectId?: number;
  trackerId?: number;
  parentId?: number;
}
