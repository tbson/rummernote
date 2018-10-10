# rummernote

React wrapper of Summernote

[![npm version](https://badge.fury.io/js/rummernote.svg)](https://badge.fury.io/js/rummernote)

## Instalation

Using `npm`:

```
npm i rummernote
```

Using `yarn`:

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
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
// For Bootstrap 3
import Rummernote from 'rummernote';
import 'rummernote/build/style.css';
import 'rummernote/build/lang/summernote-fr-FR'; // any locale that Summernote supported
/*
For Bootstrap 4
import Rummernote from 'rummernote/build/bs4';
import 'rummernote/build/bs4/style.css';
*/

type Props = {};
type State = {};
export default class RichTextEditor extends React.Component<Props, State> {
    render() {
        return <Rummernote options={{lang: 'fr-FR'}} />;
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
import 'bootstrap/dist/css/bootstrap.min.css';
import(/* webpackPreload: true */ 'bootstrap/dist/js/bootstrap');
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

Full example of using Rummernote with image upload:

```javascript
// @flow
import * as React from 'react';
// $FlowFixMe: do not complain about importing node_modules
import Loadable from 'react-loadable';
import Tools from '../helpers/Tools';

const Rummernote = Loadable({
    // $FlowFixMe: do not complain about importing node_modules
    loader: () => import('rummernote/build/bs4'),
    loading: () => <div>Loading richtext editor...</div>
});

type Props = {
    name: string,
    defaultValue: string
};

type States = {
    value: string
};

class RichTextInput extends React.Component<Props, States> {
    state = {
        value: ''
    };

    constructor(props: Props) {
        super(props);
        this.endPoint = 'some url...';
    }

    onChange = (value: string) => {
        this.setState({value});
    };

    uploadImageCallBack = async (image: File, insertImage: Function) => {
        if (image.type.indexOf('image/') === 0) {
            const params = {image};
            const result = await Tools.apiCall(this.endPoint, 'POST', params);
            if (result.success) {
                insertImage(result.data.attachment, image => {
                    if (image.width() <= 400) {
                        image.css('width', image.width());
                    } else {
                        image.css('width', '100%');
                    }
                });
            }
        }
    };

    render() {
        return (
            <div>
                <input type="hidden" name={this.props.name} defaultValue={this.state.value} />
                <Rummernote
                    value={this.props.defaultValue}
                    onImageUpload={this.uploadImageCallBack}
                    onChange={this.onChange}
                />
            </div>
        );
    }
}

const styles = {};
export default RichTextInput;
```

## PropTypes

### Value props

| Property      | Type      | Description                                                             |
| ------------- | --------- | ----------------------------------------------------------------------- |
| `options`     | `Object`  | Options object. More info about options http://summernote.org/deep-dive |
| `value`       | `String`  | Editor's value                                                          |
| `placeholder` | `String`  | Place holder                                                            |
| `disabled`    | `Boolean` | Disable editor                                                          |
| `className`   | `String`  | Class name of editor's wrapper                                          |

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
