# rummernote

React wrapper of Summernote

## Instalation

Using nmp:

```
npm install rummernote
```

Using yarn:

```
yarn add rummernote
```

## Configure Webpack

Add this plugin:

```javascript
new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery'
});
```

## Example

**Direct load:**

```javascript
// @flow
import * as React from 'react';
// For Bootstrap 3
import Rummernote from 'rummernote';
import 'rummernote/build/style.css';
/*
For Bootstrap 4
import Rummernote from 'rummernote/build/bs4';
import 'rummernote/build/bs4/style.css';
*/

type Props = {};
type State = {};
export default class RichTextEditor extends React.Component<Props, State> {
    render() {
        return <Rummernote />;
    }
}
```

**Lazy load:**

Because total bundle size of `rummernote` is about 333 Kb (included `summernote` and `codemirror`).

So we can use `webpackPreload` and `react-loadable` to load it dynamically to reduce our final bundle size increasing:

```javascript
// @flow
import * as React from 'react';
import Loadable from 'react-loadable';
// For Bootstrap 3
import(/* webpackPreload: true */ 'rummernote/build/style.css'); // This one can put in root Component

// For Bootstrap 4
// import(/* webpackPreload: true */ 'rummernote/build/bs4/style.css');

const Rummernote = Loadable({
    // For Bootsrtap 3
    loader: () => import('rummernote'),
    // For Bootsrtap 4
    // loader: () => import('rummernote/dist/bs4'),
    loading: () => <div>Loading Rummernote...</div>
});

type Props = {};
type State = {};
export default class RichTextEditor extends React.Component<Props, State> {
    render() {
        return <Rummernote />;
    }
}
```

## PropTypes

### Value props

| Property       | Type      | Description                                                             |
| -------------- | --------- | ----------------------------------------------------------------------- |
| `options`      | `Object`  | Options object. More info about options http://summernote.org/deep-dive |
| `defaultValue` | `String`  | Default value                                                           |
| `placeholder`  | `String`  | Place holder                                                            |
| `disabled`     | `Boolean` | Disable editor                                                          |
| `className`    | `String`  | Class name of editor's wrapper                                          |

### Function props

| Property        | Param type                         | Description                                                                                             |
| --------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `onInit`        | None                               | Being invoked when summernote is launched                                                               |
| `onChange`      | `String`                           | Invoked, when content's been changed                                                                    |
| `onImageUpload` | `image:File, insertImage:Function` | Return an image (File object) and [insertImage](https://summernote.org/deep-dive/#insertimage) function |
| `onEnter`       | None                               | Enter / Return button pressed                                                                           |
| `onFocus`       | None                               | Editable area receives the focus                                                                        |
| `onBlur`        | None                               | Editable area loses the focus                                                                           |
| `onKeydown`     | `key:String, keyCode:Number`       | On key down                                                                                             |
| `onKeyup`       | `key:String, keyCode:Number`       | On key up                                                                                               |
| `onPaste`       | `String`                           | Triggers when event paste's been called                                                                 |
