// @flow
import * as React from 'react';
import Rummernote from './bs3';

type Props = {};
type State = {
    value: string
};

export default class Landing extends React.Component<Props, State> {
    state = {
        value: ''
    }

    onChange = (value: string) => {
        console.log(value);
        this.setState({value});
    }

    render() {
        return <Rummernote value="Default value" onChange={this.onChange} />;
    }
}
