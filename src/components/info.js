import React from "react";
import PropTypes from 'prop-types';
import classNames from "classnames";
import FontAwesome from "react-fontawesome";
import {isEmpty} from "../utils/general";
import Ripple from "./ripple";

export default class Info extends Ripple {
    static propTypes = {
        direction: PropTypes.string,
        icon: PropTypes.string,
        iconClass: PropTypes.string,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element,
            PropTypes.arrayOf(PropTypes.element)
        ]),

        label: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element,
            PropTypes.arrayOf(PropTypes.element)
        ]),

        description: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element,
            PropTypes.arrayOf(PropTypes.element)
        ]),

        disabled: PropTypes.bool
    };

    static defaultProps = {
        direction: 'vertical',
        icon: null,
        iconClass: null,
        value: null,
        label: null,
        description: null,
        disabled: false
    };

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        const {disabled, onClick} = this.props;

        if (!disabled) {
            this.handleRippleClick(e, null, true, true);
        }

        if(isEmpty(onClick) || disabled) {
            e.stopPropagation();
            return;
        }

        onClick();
    }

    render() {
        const {direction, icon, iconClass, value, label, disabled, onClick} = this.props;

        const classes = classNames(
            'info',
            direction,
            {
                'action': !isEmpty(onClick),
                'disabled': disabled
            },
            this.props.classNames
        );

        let iconElement = null;
        if(!isEmpty(icon)) {
            iconElement = <FontAwesome className="icon" name={icon}/>;
        } else if (!isEmpty(iconClass)) {
            iconElement = <div className={classNames("icon", iconClass)}/>
        }

        return (
            <div className={classes} ref="ripple" onClick={this.handleClick}>
                <div className="container">
                    {iconElement}
                    {!isEmpty(value) ? (<div className="value">{value}</div>) : null}
                    {!isEmpty(label) ? (<div className="labelb">{label}</div>) : null}
                </div>
            </div>
        );
    }
};
