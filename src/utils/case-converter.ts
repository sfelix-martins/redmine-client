export function camelToSnakeCase(str: string) {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

export function snakeToCamelCase(str: string) {
  return str.replace(/(\_\w)/g, k => k[1].toUpperCase());
}

/**
 * Convert the object keys from camel case to snake case and return the converted object
 */
export function objKeysFromCamelToSnakeCase<T>(obj: Object): T {
  type ObjectKey = keyof object;

  let objectSnake = {} as T;

  const objectKeys = Object.keys(obj) as ObjectKey[];
  objectKeys.forEach(key => {
    objectSnake = {
      ...objectSnake,
      [camelToSnakeCase(key)]: obj[key],
    };
  });

  return objectSnake;
}

export function objKeysFromSnakeToCamelCase<T>(obj: Object): T {
  type ObjectKey = keyof object;

  let objectSnake = {} as T;

  const objectKeys = Object.keys(obj) as ObjectKey[];
  objectKeys.forEach(key => {
    objectSnake = {
      ...objectSnake,
      [snakeToCamelCase(key)]: obj[key],
    };
  });

  return objectSnake;
}
