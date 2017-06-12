import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {isEmpty} from "../utils/general";

export default class Box extends Component {
    static propTypes = {
        elevation: PropTypes.number,

        padding: PropTypes.bool,
        headerPadding: PropTypes.bool,
        bodyPadding: PropTypes.bool,
        footerPadding: PropTypes.bool,

        separator: PropTypes.bool,
        headerSeparator: PropTypes.bool,
        footerSeparator: PropTypes.bool,

        header: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element,
            PropTypes.arrayOf(PropTypes.element)
        ]),

        body: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element,
            PropTypes.arrayOf(PropTypes.element)
        ]),

        footer: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element,
            PropTypes.arrayOf(PropTypes.element)
        ])
    };

    static defaultProps = {
        elevation: null,

        padding: true,
        headerPadding: true,
        bodyPadding: true,
        footerPadding: true,

        separator: false,
        headerSeparator: false,
        footerSeparator: false,

        header: null,
        body: null,
        footer: null
    };


    render() {
        const {elevation, padding, headerPadding, bodyPadding, footerPadding, separator, headerSeparator, footerSeparator, header, body, footer} = this.props;

        const classes = classNames(
            'box',
            {
                'no-padding': !padding,
                'no-header-padding': !headerPadding,
                'no-body-padding': !bodyPadding,
                'no-footer-padding': !footerPadding,
                'header-separator': separator || headerSeparator,
                'footer-separator': separator || footerSeparator
            },
            this.props.className
        );

        return (
            <div className={classes} elevation={elevation}>
                {!isEmpty(header) ? <div className="section header">{header}</div> : null}
                {!isEmpty(body) ? <div className="section body">{body}</div> : null}
                {!isEmpty(footer) ? <div className="section footer">{footer}</div> : null}
            </div>
        );
    }
};