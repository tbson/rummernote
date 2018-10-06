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
import Rummernote from 'rummernote';
import 'rummernote/build/style.css';

type Props = {};
type State = {};
class RichTextEditor extends React.Component<Props, State> {
    render() {
        return <Rummernote />;
    }
}
```

**Lazy load:**

Because total bundle size of `rummernote` is about 661 Kb (included `summernote`, `bootstrap 3` and `codemirror`).

So we can use `webpackPreload` to load it dynamically to reduce our final bundle size increasing:

```javascript
// @flow
import * as React from 'react';
import(/* webpackPreload: true */ 'rummernote/build/style.css');

type Props = {};
type State = {
    Rummernote: React.Node
};

export default class Landing extends React.Component<Props, State> {
    state = {
        Rummernote: () => null
    };
    async componentDidMount() {
        const Rummernote = (await import(/* webpackPreload: true */ 'rummernote')).default;
        this.setState({Rummernote});
    }
    render() {
        const {Rummernote} = this.state;
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
