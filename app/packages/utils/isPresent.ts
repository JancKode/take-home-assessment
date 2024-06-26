import { isMissing } from "./isMissing";

export const isPresent = <T>(value: T | undefined | null): value is T =>
  !isMissing(value);
