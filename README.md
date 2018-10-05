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

```
import React, { Component } from 'react';
import Rummernote from 'rummernote';
import 'rummernote/build/style.css';

class RichTextEditor extends Component {
    render () {
        return <Rummernote/>
    }
}
```
