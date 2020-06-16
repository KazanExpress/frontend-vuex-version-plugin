# @kazanexpress/vuex-version-plugin

> Simple Vuex plugin to maintain actual version of the store

## Installation

```bash
npm i -D https://github.com/KazanExpress/frontend-vuex-version-plugin.git
```

## Usage

### Vue + Vuex application

```js
import { versionPlugin } from '@kazanexpress/vuex-version-plugin';

const plugins = [
  versionPlugin({
    version: 1,
    name: 'store-version',
    action: 'checkout/reset',
  })
];

const store = new Vuex.Store({
  // ...
  plugins,
})
```

### Nuxt application

> Variant 1:

In your store folder create `index.js` file:

```js
import { versionPlugin } from '@kazanexpress/vuex-version-plugin';

export const plugins = [
  versionPlugin({
    version: 1,
    name: 'store-version',
    action: 'checkout/reset',
  })
];
```

> Variant 2:

Create `vuex-version.js` file in your plugins folder:

```js
import { versionPlugin } from '@kazanexpress/vuex-version-plugin';

export default ({ store }) => {
  versionPlugin({
    version: 1,
    name: 'store-version',
    action: 'checkout/reset',
  })(store);
};
```

In your `nuxt.config.js`:

```js
  ...

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    // ...
    { src: '~/plugins/vuex-version', mode: 'client' }
  ],

  ...
```

## Options

|Option | Type | Description | Default|
|-|-|-|-|
|`version` | `Number` | Your current store version. | `1` |
|`name` | `String` | Item key in localStorage. | `"application-store-version"` |
|`action` | `String` | Store action path (could be namespaced) for triggering on `clear`. | `undefined` |
