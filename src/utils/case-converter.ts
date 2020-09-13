export function camelToSnakeCase(str: string) {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

/**
 * Convert the object keys from camel case to snake case and return the converted object
 */
export function objKeysFromCamelToSnakeCase(obj: Object): Object {
  type ObjectKey = keyof object;

  let objectSnake = {};

  const objectKeys = Object.keys(obj) as ObjectKey[];
  objectKeys.forEach(key => {
    objectSnake = {
      ...objectSnake,
      [camelToSnakeCase(key)]: obj[key],
    };
  });

  return objectSnake;
}
