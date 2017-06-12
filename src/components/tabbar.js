import React, {Component} from "react";
import classNames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";

export default class TabBar extends Component {
    render() {
        const classes = classNames(
            'tabbar',
            this.props.className
        );

        return (
            <div className={classes}>
                <PerfectScrollbar><div className="list">{this.props.children}</div></PerfectScrollbar>
            </div>
        );
    }
};