import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export default class ButtonGroup extends Component {
    static propTypes = {
        align: PropTypes.string,
        direction: PropTypes.string,
        force: PropTypes.bool
    };

    static defaultProps = {
        align: 'right',
        direction: 'row',
        force: false
    };

    render() {
        const {align, direction, force, children} = this.props;

        const classes = classNames(
            'button-group',
            align,
            direction,
            {
                'force': force
            },
            this.props.classNames
        );

        return (
            <div className={classes}>{children}</div>
        );
    }
};