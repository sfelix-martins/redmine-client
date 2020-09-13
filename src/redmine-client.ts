import axios, { AxiosStatic } from 'axios';

import { RedmineClientConfig } from './contracts';
import { IssuesResource } from './resources/issues/index';
import { TimeEntriesResource } from './resources/time-entries';

export class RedmineClient {
  public readonly api: AxiosStatic;

  constructor(private host: string, private config: RedmineClientConfig) {
    const { username, password } = this.config;

    axios.defaults.baseURL = this.host;
    axios.defaults.auth = { username, password };

    this.api = axios;
  }

  public issues() {
    return new IssuesResource(this);
  }

  public timeEntries() {
    return new TimeEntriesResource(this);
  }
}

export default RedmineClient;
