import React, {Component} from "react";
import {connect} from "react-redux";
import {protectedRoute} from "../../utils/wrapper";
import Message from "../../components/message";
import {Translate, I18n} from "react-redux-i18n";

@protectedRoute
@connect()
export default class Index extends Component {

    render() {
        return (
            <div>
                <Message
                    icon="info"
                    title={<Translate value="whereTo.title"/>}
                    description={<Translate value="whereTo.description"/>}/>
            </div>
        );
    }
};