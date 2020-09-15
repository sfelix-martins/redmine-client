import {
  camelToSnakeCase,
  objKeysFromCamelToSnakeCase,
  objKeysFromSnakeToCamelCase,
  snakeToCamelCase,
} from '../../src/utils/case-converter';

describe('Case Converter', () => {
  describe.each([
    ['camelCase', 'camel_case'],
    ['statusId', 'status_id'],
  ])('camelToSnakeCase: %s -> %s', (camel, snake) => {
    it('should convert case', () => {
      const converted = camelToSnakeCase(camel);

      expect(snake).toBe(converted);
    });
  });

  describe.each([
    [{ statusId: 1 }, { status_id: 1 }],
    [
      { status_id: 1, projectId: 2 },
      { status_id: 1, project_id: 2 },
    ],
  ])('objKeysFromCamelToSnakeCase: %s -> %s', (camel, snake) => {
    it('should convert object case', () => {
      const converted = objKeysFromCamelToSnakeCase(camel);

      expect(snake).toStrictEqual(converted);
    });
  });

  describe.each([
    ['camel_case', 'camelCase'],
    ['status_id', 'statusId'],
  ])('snakeToCamelCase: %s -> %s', (snake, camel) => {
    it('should convert case', () => {
      const converted = snakeToCamelCase(snake);

      expect(camel).toBe(converted);
    });
  });

  describe.each([
    [{ status_id: 1 }, { statusId: 1 }],
    [
      { statusId: 1, project_id: 2 },
      { statusId: 1, projectId: 2 },
    ],
  ])('objKeysFromSnakeToCamelCase: %s -> %s', (snake, camel) => {
    it('should convert object case', () => {
      const converted = objKeysFromSnakeToCamelCase(snake);

      expect(camel).toStrictEqual(converted);
    });
  });
});
