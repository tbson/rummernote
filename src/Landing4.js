// @flow
import * as React from 'react';
import Rummernote from './bs4';

type Props = {};
type State = {};

export default class Landing extends React.Component<Props, State> {
    render() {
        return (
            <div>
                <Rummernote />
                <Rummernote />
            </div>
        );
    }
}
