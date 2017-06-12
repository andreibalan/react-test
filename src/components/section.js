import React, {Component} from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import {connect} from "react-redux";
import {sectionScroll} from "../actions/application";
import {isEmpty} from "../utils/general";
import TabBar from "./tabbar";

@connect()
export default class Section extends Component {
    static propTypes = {
        padding: PropTypes.bool,
        scrollable: PropTypes.bool,

        tabs: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.arrayOf(PropTypes.element)
        ]),
    };

    static defaultProps = {
        padding: true,
        scrollable: true,

        tabs: null
    };

    constructor(props) {
        super(props);

        this.state = {
            isScrolled: false
        };

        this.handleScrollTop = this.handleScrollTop.bind(this);
    }

    componentWillUnmount() {
        this.props.dispatch(sectionScroll(false));
    }

    handleScrollTop(container) {
        const {isScrolled} = this.state;
        const {scrollTop} = container;

        if (scrollTop <= 10 && isScrolled) {
            this.setState({isScrolled: false});
            this.props.dispatch(sectionScroll(false));
        } else if (scrollTop > 10 && !isScrolled) {
            this.setState({isScrolled: true});
            this.props.dispatch(sectionScroll(true));
        }
    }

    render() {
        const {padding, scrollable, tabs} = this.props;
        const {isScrolled} = this.state;

        const classes = classNames(
            'section',
            {
                'padding': padding,
                'scrollable': scrollable,
                'scrolled': isScrolled
            },
            this.props.className
        );

        return (
            <div className={classes}>
                {!isEmpty(tabs) ? (<TabBar>{tabs}</TabBar>) : null}
                <div className="content-wrapper">
                    {scrollable ? (
                            <PerfectScrollbar onScrollY={this.handleScrollTop}>
                                <div className="content">{this.props.children}</div>
                            </PerfectScrollbar>
                        ) : (
                            <div className="content">{this.props.children}</div>
                        )}
                </div>
            </div>
        );
    }
};
