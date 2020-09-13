import { AxiosInstance } from 'axios';
import formatDate from 'date-fns/format';

import { RedmineClient } from '../redmine-client';
import {
  camelToSnakeCase,
  // objKeysFromCamelToSnakeCase,
} from '../utils/case-converter';

export abstract class BaseResource {
  protected readonly api: AxiosInstance;

  constructor(client: RedmineClient) {
    this.api = client.api;
  }

  protected prepareParams(params: Object) {
    type ObjectKey = keyof object;

    let preparedParams: any;
    const objectKeys = Object.keys(params) as ObjectKey[];

    objectKeys.forEach(key => {
      preparedParams = {
        ...preparedParams,
        [camelToSnakeCase(key)]: this.prepareParam(params[key]),
      };
    });

    return preparedParams;
  }

  private prepareParam(value: unknown) {
    return value instanceof Date ? formatDate(value, 'yyyy-MM-dd') : value;
  }
}
