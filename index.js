import { diff as semverDiff } from 'semver';

export const versionPlugin = ({ version, name, action, diff, predicate = (oldVer, newVer) => oldVer !== newVer } = {}) => {
  return !process.server ? (store) => {
    const currentVersion = version || 1;
    const itemKey = name || 'application-store-version';
    const localVersion = localStorage.getItem(itemKey) || 0;

    function cleanTheMess() {
      localStorage.clear();
      localStorage.setItem(itemKey, currentVersion);

      if (action && store._actions[action]) {
        store.dispatch(action);
      }
    }

    if (
      !localVersion ||
      (!diff && typeof predicate === 'function' && predicate(localVersion, currentVersion)) ||
      (diff && semverDiff(localVersion, currentVersion) === diff)
    ) {
      cleanTheMess();
    }
  } : () => {};
};
