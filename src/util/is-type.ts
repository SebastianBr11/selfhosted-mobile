export function isObject<T = unknown>(
  value: unknown,
): value is Record<string, T> {
  return typeof value === 'object' && !Array.isArray(value) && value !== null
}

export function isArray<T = unknown>(value: unknown): value is T[] {
  return Array.isArray(value)
}
