import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {isEmpty} from "../utils/general";
import FontAwesome from "react-fontawesome";
import Ripple from "./ripple";

export default class Button extends Ripple {
    static propTypes = {
        primary: PropTypes.bool,
        disabled: PropTypes.bool,
        label: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element,
            PropTypes.arrayOf(PropTypes.element)
        ]),
        leftIcon: PropTypes.string,
        rightIcon: PropTypes.string
    };

    static defaultProps = {
        primary: false,
        disabled: false,
        label: null,
        leftIcon: null,
        rightIcon: null
    };

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        const {disabled, onClick} = this.props;

        if (isEmpty(onClick) || disabled) {
            e.stopPropagation();
            return;
        }

        this.handleRippleClick(e, null, true, false);
        onClick();
    }

    render() {
        const {primary, disabled, label, leftIcon, rightIcon} = this.props;

        const classes = classNames(
            'btn',
            {
                'primary': primary,
                'disabled': disabled,
                'left-icon': !isEmpty(leftIcon),
                'right-icon': !isEmpty(rightIcon)
            },
            this.props.classNames
        );

        return (
            <div className={classes} ref="ripple" onClick={this.handleClick}>
                {!isEmpty(leftIcon) ? <FontAwesome className="icon left" name={leftIcon}/> : null}
                {label}
                {!isEmpty(rightIcon) ? <FontAwesome className="icon right" name={rightIcon}/> : null}
            </div>
        );
    }
};