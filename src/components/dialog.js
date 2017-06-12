import React, {Component} from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames";
import {isEmpty} from "../utils/general";
import ButtonGroup from "./buttonGroup";
import Box from "./box";
import $ from "jquery";
import {store} from "../store";
import {CSSTransitionGroup} from "react-transition-group";

export default class Dialog extends Component {
    static propTypes = {
        title: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element,
            PropTypes.arrayOf(PropTypes.element)
        ]),

        dismissible: PropTypes.bool,

        buttons: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.arrayOf(PropTypes.element)
        ]),

        onDismiss: PropTypes.func,
    };

    static defaultProps = {
        title: null,
        dismissible: true,

        buttons: null,

        onDismiss: null
    };

    constructor(props) {
        super(props);

        this.componentWillRenderDialog = this.componentWillRenderDialog.bind(this);
        this.renderDialog = this.renderDialog.bind(this);
        this.handleDismiss = this.handleDismiss.bind(this);
    }

    componentDidMount() {
        this.dialogTarget = document.createElement("div");
        this.dialogTarget.className = "dialog-container";
        document.body.appendChild(this.dialogTarget);
        this.componentWillRenderDialog();

        setTimeout(() => this.dialogTarget.classList.add("active"), 50);
    }

    componentDidUpdate() {
        this.componentWillRenderDialog();
    }

    componentWillUpdate() {
        this.componentWillRenderDialog();
    }

    componentWillUnmount() {
        ReactDOM.unmountComponentAtNode(this.dialogTarget);

        this.dialogTarget.classList.remove("active");
        setTimeout(() => document.body.removeChild(this.dialogTarget), 300);
    }

    componentWillRenderDialog() {
        ReactDOM.render(this.renderDialog(), this.dialogTarget);
    }

    handleDismiss(e) {
        const {dismissible, onDismiss} = this.props;

        if (isEmpty(onDismiss) || !dismissible || $(e.target).closest($(this.dialogTarget).find('.box')).length > 0) {
            e.stopPropagation();
            return;
        }

        onDismiss();
    }

    renderDialog() {
        const {title, buttons, children} = this.props;

        const classes = classNames(
            'dialog',
            this.props.classNames
        );

        let titleElement = null;
        if (!isEmpty(title)) {
            titleElement = <div className="title">{title}</div>;
        }

        let buttonsElement = null;
        if (!isEmpty(buttons)) {
            buttonsElement = <ButtonGroup>{buttons}</ButtonGroup>;
        }

        return (
            <Provider store={store}>
                <div className={classes} onClick={this.handleDismiss}>
                    <CSSTransitionGroup
                        transitionName="dialog"
                        transitionAppear={true}
                        transitionAppearTimeout={500}
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}>
                        <Box
                            className="dialog-box"
                            elevation={5}
                            padding={false}
                            header={titleElement}
                            body={children}
                            footer={buttonsElement}
                        />
                    </CSSTransitionGroup>
                </div>
            </Provider>
        );
    }

    render() {
        return null;
    }
};