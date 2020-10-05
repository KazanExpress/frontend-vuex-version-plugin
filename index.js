export const versionPlugin = ({ version, name, action, predicate = (newVer, oldVer) => newVer !== oldVer } = {}) => {
  return !process.server ? (store) => {
    const currentVersion = version || 1;
    const itemKey = name || 'application-store-version';
    const localVersion = localStorage.getItem(itemKey) || 0;
    if (!localVersion || predicate(localVersion, currentVersion)) {
      localStorage.clear();
      localStorage.setItem(itemKey, currentVersion);

      if (action && store._actions[action]) {
        store.dispatch(action);
      }
    }
  } : () => {};
};
