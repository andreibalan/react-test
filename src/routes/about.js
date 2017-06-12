import React, {Component} from "react";
import {connect} from "react-redux";
import {protectedRoute} from "../utils/wrapper";
import Section from "../components/section";
import {changeRouteInfo} from "../actions/application";
import {NavLink, Route, Switch} from "react-router-dom";
import Index from "./about/index";
import Page from "./about/page";
import {isEmpty} from "../utils/general";
import {firebaseConnect, isLoaded, dataToJS} from "react-redux-firebase";
import NProgress from "react-nprogress";
import Message from "../components/message";
import {Translate} from "react-redux-i18n";

@protectedRoute
@firebaseConnect((props) => [`/pages#orderByChild=public&equalTo=false`])
@connect(({firebase}) => {
    const pages = dataToJS(firebase, 'pages');
    const data = {};

    if (!isEmpty(pages)) {
        data.pages = Object.values(pages);
    }

    return data;
})
export default class About extends Component {

    componentWillMount() {
        this.props.dispatch(changeRouteInfo({
            title: <Translate value="pageTitles.about"/>,
            canGoBack: true
        }));
    }

    render() {
        const {pages, match} = this.props;
        const isContentLoaded = isLoaded(pages);

        if (!isContentLoaded) {
            NProgress.start()
        } else {
            NProgress.done();
        }

        let tabs = null;
        if (!isEmpty(pages)) {
            tabs = pages.map(p => (<NavLink key={p.id} to={`${match.url}/${p.id}`}>{p.title}</NavLink>))
        }

        return (
            <Section tabs={tabs} scrollable={!match.isExact && isContentLoaded}>
                {!isContentLoaded ? (
                        <Message
                            loading={true}
                            title={<Translate value="loading.title"/>}
                            description={<Translate value="loading.contentDescription"/>}/>
                    ) : (
                        <Switch>
                            <Route exact path={match.url} component={Index}/>
                            <Route path={`${match.url}/:id`} render={(props) => <Page pages={pages} {...props}/>}/>
                        </Switch>
                    )}
            </Section>
        );
    }
};