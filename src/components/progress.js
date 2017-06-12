import React, {Component} from "react";
import PropTypes from 'prop-types';
import classNames from "classnames";

export default class Progress extends Component {
    static propTypes = {
        bars: PropTypes.number
    };

    static defaultProps = {
        bars: 7
    };

    render() {
        const {bars} = this.props;

        const classes = classNames(
            'progress',
            this.props.classNames
        );

        const barElements = Array.from(new Array(bars), (x, i) => i).map((key) => <div key={key}
                                                                                       className="bar"></div>);

        return (
            <div className={classes}>{barElements}</div>
        );
    }
};