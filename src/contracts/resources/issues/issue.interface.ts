import { CustomField } from '../../custom-field.interface';
import { NameableObj } from '../../nameable-obj.interface';

export interface Issue {
  id: number;
  project: NameableObj;
  tracker: NameableObj;
  status: NameableObj;
  priority: NameableObj;
  author: NameableObj;
  assignedTo: NameableObj;
  fixedVersion: NameableObj;
  subject: string;
  description: string;
  startDate: string;
  dueDate: string | null;
  doneRatio: number;
  isPrivate: boolean;
  estimatedHours: number | null;
  customFields: CustomField[];
  createdOn: string;
  updatedOn: string;
  closedOn: string | null;
}

export interface NotParsedIssue
  extends Omit<
    Issue,
    | 'assignedTo'
    | 'fixedVersion'
    | 'startDdate'
    | 'dueDate'
    | 'doneRatio'
    | 'isPrivate'
    | 'estimatedHours'
    | 'customFields'
    | 'createdOn'
    | 'updatedOn'
    | 'closedOn'
  > {
  assigned_to: NameableObj;
  fixed_version: NameableObj;
  start_date: string;
  due_date: string;
  done_ratio: number;
  is_private: boolean;
  estimated_hours: number | null;
  custom_fields: CustomField[];
  created_on: string;
  updated_on: string;
  closed_on: string | null;
}
