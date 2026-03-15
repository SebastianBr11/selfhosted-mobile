export function isObject<T = unknown>(
  value: unknown,
): value is Record<string, T> {
  return typeof value === 'object' && !Array.isArray(value) && value !== null
}
