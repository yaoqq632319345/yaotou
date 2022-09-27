import { pathExistsSync } from 'path-exists';

export function exists(path) {
  return pathExistsSync(path);
}
