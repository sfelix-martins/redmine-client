import {
  camelToSnakeCase,
  objKeysFromCamelToSnakeCase,
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
});
