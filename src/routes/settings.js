import React, {Component} from "react";
import {connect} from "react-redux";
import {protectedRoute} from "../utils/wrapper";
import Section from "../components/section";
import {changeRouteInfo} from "../actions/application";
import {NavLink} from "react-router-dom";
import Message from "../components/message";
import Button from "../components/button";
import ButtonGroup from "../components/buttonGroup";
import {routerActions} from "react-router-redux";
import {Translate, I18n} from "react-redux-i18n";

@connect()
@protectedRoute
export default class Settings extends Component {

    componentWillMount() {
        this.props.dispatch(changeRouteInfo({
            title: <Translate value="pageTitles.settings"/>,
            canGoBack: true
        }));
    }

    render() {
        const {dispatch} = this.props;

        return (
            <Section scrollable={false}>
                <Message
                    icon="cogs"
                    title={<Translate value="emptyPage.title"/>}
                    description={<Translate value="emptyPage.description"/>}>
                    <ButtonGroup align="center">
                        <Button
                            label={<Translate value="goBack"/>}
                            leftIcon="chevron-left"
                            onClick={() => dispatch(routerActions.goBack())}/>
                    </ButtonGroup>
                </Message>
            </Section>
        );
    }
};