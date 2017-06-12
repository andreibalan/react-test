import React, {Component} from "react";
import PropTypes from 'prop-types';
import classNames from "classnames";
import {isEmpty} from "../utils/general";
import Progress from "./progress";
import FontAwesome from "react-fontawesome";

export default class Message extends Component {
    static propTypes = {
        title: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element,
            PropTypes.arrayOf(PropTypes.element)
        ]),

        description: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element,
            PropTypes.arrayOf(PropTypes.element)
        ]),

        loading: PropTypes.bool,
        icon: PropTypes.string,
        imageClass: PropTypes.string,
        progress: PropTypes.number,
        center: PropTypes.bool,
    };

    static defaultProps = {
        title: null,
        description: null,
        loading: false,
        icon: null,
        imageClass: null,
        progress: null,
        center: true
    };

    render() {
        const {title, description, loading, icon, imageClass, center, children} = this.props;

        const classes = classNames(
            'message',
            {
                'center': center
            },
            this.props.classNames
        );

        const imageClasses = classNames(
            'image',
            imageClass
        );

        let loadingOrIconElement = null;
        if (loading) {
            loadingOrIconElement = <Progress/>
        } else if (!isEmpty(icon)) {
            loadingOrIconElement = <FontAwesome className="icon" name={icon}/>;
        }

        return (
            <div className={classes}>
                <div className="top">
                    {!isEmpty(this.props.imageClass) ? <div className={imageClasses}/> : null}
                </div>

                <div className="bottom">
                    {loadingOrIconElement}
                    {!isEmpty(title) ? (<div className="title">{title}</div>) : null}
                    {!isEmpty(description) ? (<div className="description">{description}</div>) : null}
                    {!isEmpty(children) ? (<div className="content">{children}</div>) : null}
                </div>
            </div>
        );
    }
};