/**
 * Checks that all IDs of type {@link T} are present in type {@link U} and no others.
 */
export type AssertExactlyAllIdsPresent<
  T extends readonly { id: string }[],
  U extends string,
> = [U] extends [T[number]['id']]
  ? [T[number]['id']] extends [U]
    ? T
    : never
  : never

/**
 * Checks that at least all IDs of type {@link T} are present in type {@link U}.
 */
export type AssertAtLeastAllIds<
  T extends readonly { id: string }[],
  U extends string,
> = [U] extends [T[number]['id']] ? T : never
