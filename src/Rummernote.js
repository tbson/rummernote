// @flow
import React from 'react';

import $ from 'jquery';
import 'summernote/dist/summernote';
import 'bootstrap/js/dropdown';
import 'bootstrap/js/tooltip';
import 'bootstrap/js/popover';
import 'bootstrap/js/modal';
import 'summernote/dist/summernote.css';
import 'codemirror/lib/codemirror.css';
import 'bootstrap/dist/css/bootstrap.css';

type Props = {
    options: Object,
    placeholder: string,
    popatmouse: boolean,
    disabled: boolean,
    value?: string,
    defaultValue?: string,
    className?: string
};
type State = {
    localChange: boolean,
    status: string,
    value?: string
};

const randomUid = () => Math.floor(Math.random() * 100000);

export default class Rummernote extends React.Component<Props, State> {
    static defaultProps = {
        options: {},
        placeholder: '',
        popatmouse: false,
        disabled: false
    };

    state = {
        localChange: false,
        status: 'enable'
    };

    constructor(props) {
        super(props);
        this.editor = {};
        this.uid = `react-summernote-${randomUid()}`;
        this.options = props.options;
        this.options.callbacks = {
            onInit: props.onInit,
            onEnter: props.onEnter,
            onFocus: props.onFocus,
            onBlur: props.onBlur,
            onKeyup: props.onKeyUp,
            onKeydown: props.onKeyDown,
            onPaste: props.onPaste,
            onChange: props.onChange,
            onImageUpload: props.onImageUpload
        };
        this.options.popatmouse = props.popatmouse;
        this.options.placeholder = props.placeholder;
    }

    static getDerivedStateFromProps(nextProps: Props, prevState: States) {
        const {disabled, value} = nextProps;
        if (prevState.localChange) {
            return {
                localChange: false
            };
        }

        const state = {
            localChange: false,
            status: disabled ? 'disable' : 'enable'
        };

        if (nextProps.value !== prevState.value) {
            state.value = value;
        }

        return state;
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        this.applyStatus();
        this.applyNewContent();
    }

    componentDidMount() {
        this.editor = $(`#${this.uid}`);
        this.editor.summernote(this.options);
        this.applyStatus();
    }

    applyStatus = () => {
        const {status} = this.state;
        this.editor.summernote(status);
    };

    applyNewContent = () => {
        const {value} = this.state;
        this.editor.summernote('code', value);
    };

    focus = () => {
        this.editor.summernote('focus');
    };

    isEmpty = (): boolean => {
        return this.editor.summernote('isEmpty');
    };

    reset = () => {
        this.editor.summernote('reset');
    };

    insertImage = (url: string, filenameOrCallback: Function) => {
        this.editor.summernote('insertImage', url, filenameOrCallback);
    };

    render() {
        const {value, defaultValue, className} = this.props;
        const html = value || defaultValue;
        return <div id={this.uid} className={className || ''} dangerouslySetInnerHTML={{__html: html}} />;
    }
}
