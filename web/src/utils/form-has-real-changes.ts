import isEqual from "lodash/isEqual";

function hasRealChanges<T extends object>(initial: T, updated: Partial<T>) {
  return Object.keys(updated).some((key) => {
    return !isEqual(updated[key as keyof T], initial[key as keyof T]);
  });
}

export { hasRealChanges };
