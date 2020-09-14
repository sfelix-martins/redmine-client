interface CreateTimeEntryBaseParams {
  spentOn?: Date;
  hours: number;
  activityId?: number;
  comments?: string;
}

interface CreateTimeEntryParamsForIssue extends CreateTimeEntryBaseParams {
  issueId: number;
  projectId?: never;
}

interface CreateTimeEntryParamsForProject extends CreateTimeEntryBaseParams {
  projectId: number;
  issueId?: never;
}

export type CreateTimeEntryParams =
  | CreateTimeEntryParamsForIssue
  | CreateTimeEntryParamsForProject;
