import React, {Component} from "react";
import {connect} from "react-redux";
import {protectedRoute} from "../../utils/wrapper";
import {isEmpty} from "../../utils/general";
import Markdown from "react-remarkable";

@protectedRoute
@connect()
export default class Page extends Component {

    constructor(props) {
        super(props);

        this.getPage = this.getPage.bind(this);
    }

    getPage() {
        const {match, pages} = this.props;

        if (!isEmpty(pages)) {
            return pages.filter(p => p.id === match.params.id)[0];
        }

        return null;
    }

    render() {
        const page = this.getPage();

        let pageSource = !isEmpty(page) ? page.content : null;

        return (
            <div>
                <Markdown source={pageSource}/>
            </div>
        );
    }
};