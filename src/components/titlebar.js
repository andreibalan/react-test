import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import FontAwesome from "react-fontawesome";
import {isEmpty} from "../utils/general";

export default class TitleBar extends Component {
    static propTypes = {
        icon: PropTypes.string,
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

        padding: PropTypes.bool,
        presenter: PropTypes.bool,

        extraElements: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.arrayOf(PropTypes.element)
        ]),

        infoElements: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.arrayOf(PropTypes.element)
        ]),

        actionElements: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.arrayOf(PropTypes.element)
        ]),

        onPresenterClick: PropTypes.func
    };

    static defaultProps = {
        icon: null,
        title: null,
        description: null,
        padding: true,
        presenter: true,

        extraElements: null,
        infoElements: null,
        actionElements: null,

        onPresenterClick: null
    };

    constructor(props) {
        super(props);

        this.handlePresenterClick = this.handlePresenterClick.bind(this);
    }

    handlePresenterClick(e) {
        const {onPresenterClick} = this.props;

        if (isEmpty(onPresenterClick)) {
            e.stopPropagation();
            return;
        }

        onPresenterClick();
    }

    render() {
        const {icon, title, description, padding, presenter, extraElements, infoElements, actionElements, onPresenterClick} = this.props;

        const classes = classNames(
            'titlebar',
            {
                'icon': !isEmpty(icon),
                'padding': padding,
                'presenter': presenter,
                'action': !isEmpty(onPresenterClick)
            },
            this.props.className
        );

        let presenterElement = null;
        if (presenter) {
            presenterElement = (
                <div className="presenter">
                    {!isEmpty(title) ? <div className="title">{title}</div> : null}
                    {!isEmpty(description) ? <div className="description">{description}</div> : null}
                </div>
            );
        }

        return (
            <div className={classes}>
                {!isEmpty(icon) ? (<div className="icon" onClick={this.handlePresenterClick}><FontAwesome name={icon}/></div>) : null}
                {presenterElement}

                {!isEmpty(extraElements) ? (<div className="extra">{extraElements}</div>) : null}
                {!isEmpty(infoElements) ? (<div className="info">{infoElements}</div>) : null}
                {!isEmpty(actionElements) ? (<div className="action">{actionElements}</div>) : null}
            </div>
        );
    }
};
