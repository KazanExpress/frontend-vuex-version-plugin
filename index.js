import { diff as semverDiff, coerce } from 'semver';

export const versionPlugin = ({ version, name, action, diff, predicate = (oldVer, newVer) => oldVer !== newVer } = {}) => {
  return !process.server ? (store) => {
    const currentVersion = coerce(version || 1);
    const itemKey = name || 'application-store-version';
    const localVersion = coerce(localStorage.getItem(itemKey) || 0);

    function cleanTheMess() {
      localStorage.clear();
      localStorage.setItem(itemKey, currentVersion);

      if (action && store._actions[action]) {
        store.dispatch(action);
      }
    }

    function hasDiff() {
      if (diff) {
        const diffList = Array.isArray(diff) ? diff : [diff];
        const currentDiff = semverDiff(localVersion, currentVersion);

        if (diffList.includes(currentDiff)) {
          return true;
        }

        return false;
      } else {
        return typeof predicate === 'function' && predicate(localVersion, currentVersion);
      }
    }

    if (!localVersion || hasDiff()) {
      cleanTheMess();
    }
  } : () => {};
};
