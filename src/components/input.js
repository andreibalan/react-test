import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import FontAwesome from "react-fontawesome";
import {isEmpty} from "../utils/general";

export default class Input extends Component {
    static propTypes = {
        icon: PropTypes.string,
        error: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element,
            PropTypes.arrayOf(PropTypes.element)
        ]),

        value: PropTypes.string,
        name: PropTypes.string,
        required: PropTypes.bool,
        disabled: PropTypes.bool,
        placeholder: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element,
            PropTypes.arrayOf(PropTypes.element)
        ]),

        type: PropTypes.string,
        passwordToggle: PropTypes.bool,

        onSubmit: PropTypes.func,
        onChange: PropTypes.func,
        onErrorDismiss: PropTypes.func,
    };

    static defaultProps = {
        // icon: null,
        // error: null,
        // name: null,
        required: false,
        // placeholder: null,
        type: "text",
        disabled: false,
        passwordToggle: true,

        // onSubmit: null,
        // onChange: null,
        // onErrorDismiss: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            isPasswordVisible: false
        };

        this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleErrorDismiss = this.handleErrorDismiss.bind(this);
    }

    togglePasswordVisibility() {
        this.setState(prevState => ({
            isPasswordVisible: !prevState.isPasswordVisible
        }));
    }

    handleSubmit() {
        const {onSubmit} = this.props;

        if(isEmpty(onSubmit)) {
            return;
        }

        onSubmit();
    }

    handleChange(e) {
        const {onChange} = this.props;

        if(isEmpty(onChange)) {
            return;
        }

        onChange(e);
    }

    handleErrorDismiss() {
        const {onErrorDismiss} = this.props;

        if(isEmpty(onErrorDismiss)) {
            return;
        }

        onErrorDismiss();
    }

    render() {
        const {icon, error, value, name, required, placeholder, type, passwordToggle, disabled} = this.props;
        const {isPasswordVisible} = this.state;

        const classes = classNames(
            'input',
            type,
            {
              'icon': !isEmpty(icon),
                'error': !isEmpty(error),
                'visible': isPasswordVisible
            },
            this.props.className
        );

        let internalType = type;
        if(type === 'password' && isPasswordVisible) {
            internalType = 'text';
        }

        let rightButtonElement = null;
        if(type === 'password' && passwordToggle) {
            rightButtonElement = <FontAwesome className="preview" name="eye" onClick={this.togglePasswordVisibility}/>;
        } else if (type === 'search') {
            rightButtonElement = <FontAwesome className="clear" name="times" onClick={this.togglePasswordVisibility}/>;
        }

        return (
            <div className={classes}>
                {!isEmpty(icon) ? (<FontAwesome className="icon" name={icon}/>) : null}
                {rightButtonElement}

                <input
                    placeholder={placeholder}
                    type={internalType}
                    value={value}
                    required={required}
                    disabled={disabled}
                    name={name}
                    ref={(input) => { this.input = input; }}
                    onSubmit={this.handleSubmit}
                    onChange={this.handleChange}
                />

                {!isEmpty(error) ? (<div className="error" onClick={this.handleErrorDismiss}><FontAwesome className="icon" name="exclamation-triangle"/>{error}</div>) : null}
            </div>
        );
    }
};
