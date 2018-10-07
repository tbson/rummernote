// @flow
import React from 'react';
import $ from 'jquery';
import 'codemirror/lib/codemirror.css';

type Props = {
    options?: Object,
    placeholder?: string,
    disabled?: boolean,
    defaultValue?: string,
    className?: string,
    onInit?: Function,
    onEnter?: Function,
    onFocus?: Function,
    onBlur?: Function,
    onKeyUp?: Function,
    onKeydown?: Function,
    onPaste?: Function,
    onChange?: Function,
    onImageUpload?: Function
};
type State = {
    localChange: boolean,
    status: string
};

const randomUid = () => Math.floor(Math.random() * 100000);

export default class Rummernote extends React.Component<Props, State> {
    static defaultProps = {
        options: {},
        placeholder: '',
        disabled: false
    };

    state = {
        localChange: false,
        status: 'enable'
    };

    constructor(props) {
        super(props);
        this.editor = {};
        this.uid = `rummernote-${randomUid()}`;
        this.options = props.options;
        this.options.callbacks = {
            onInit: props.onInit,
            onImageUpload: typeof props.onImageUpload === 'function' && this.onImageUpload,
            onChange: props.onChange,
            onEnter: props.onEnter,
            onFocus: props.onFocus,
            onBlur: props.onBlur,
            onKeyup: event => {
                if (typeof props.onKeyup === 'function') {
                    return props.onKeyup(event.key, event.keyCode);
                }
            },
            onKeydown: event => {
                if (typeof props.onKeydown === 'function') {
                    return props.onKeydown(event.key, event.keyCode);
                }
            },
            onPaste: event => {
                const value = event.originalEvent.clipboardData.getData('text');
                return props.onPaste(value);
            }
        };
        this.options.popatmouse = false;
        this.options.placeholder = props.placeholder;
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        this.prepareEditor();
    }

    componentDidMount() {
        this.editor = $(`#${this.uid}`);
        this.editor.summernote(this.options);
        this.prepareEditor();
    }

    componentWillUnmount() {
        if (this.editor.summernote) {
            this.editor.summernote('destroy');
        }
    }

    onImageUpload = (images: FileList) => {
        const image = images[0];
        return this.props.onImageUpload(image, this.insertImage);
    };

    prepareEditor = () => {
        this.applyStatus();
        this.applyNewContent();
    };

    applyStatus = () => {
        const {disabled} = this.props;
        this.editor.summernote(disabled ? 'disable' : 'enable');
    };

    applyNewContent = () => {
        const {defaultValue} = this.props;
        this.editor.summernote('code', defaultValue);
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
        const {defaultValue, className} = this.props;
        const html = defaultValue;
        return (
            <div className={`rummernote-wrapper ${className || ''}`.trim()}>
                <div id={this.uid} dangerouslySetInnerHTML={{__html: html}} />
            </div>
        );
    }
}
