export const isMissing = (value: unknown): value is undefined | null | void =>
  value === undefined || value === null;
