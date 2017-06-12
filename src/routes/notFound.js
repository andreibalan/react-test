import React, {Component} from "react";
import {connect} from "react-redux";
import Section from "../components/section";
import Message from "../components/message";
import {changeRouteInfo} from "../actions/application";
import {Translate} from "react-redux-i18n";

@connect()
export default class Settings extends Component {

    componentWillMount() {
        this.props.dispatch(changeRouteInfo({
            title: <Translate value="pageTitles.notFound"/>,
            canGoBack: true
        }));
    }

    render() {
        return (
            <Section scrollable={false}>
                    <Message
                        icon="flag"
                        title={<Translate value="notFound.title"/>}
                        description={<Translate value="notFound.description"/>}/>
            </Section>
        );
    }
};