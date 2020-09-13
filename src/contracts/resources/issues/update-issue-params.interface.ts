export interface UpdateIssueParams {
  projectId: number;
  trackerId: number;
  statusId: number;
  subject: string;
  notes: string;
  privateNotes: string;
}
