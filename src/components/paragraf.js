import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {isEmpty} from "../utils/general";
import FontAwesome from "react-fontawesome";

export default class Paragraf extends Component {
    static propTypes = {
        leftIcon: PropTypes.string,
        rightIcon: PropTypes.string
    };

    static defaultProps = {
        leftIcon: null,
        rightIcon: null
    };

    render() {
        const {leftIcon, rightIcon, children} = this.props;

        const classes = classNames(
            'paragraf',
            {
                'left-icon': !isEmpty(leftIcon),
                'right-icon': !isEmpty(rightIcon)
            },
            this.props.className
        );

        return (
            <div className={classes}>
                {!isEmpty(leftIcon) ? (<div className="icon left"><FontAwesome name={leftIcon}/></div>) : null}
                {children}
                {!isEmpty(rightIcon) ? (<div className="icon right"><FontAwesome name={rightIcon}/></div>) : null}
            </div>
        );
    }
};
