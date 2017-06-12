import React, {Component} from "react";
import Track from "../components/track";
import Section from "../components/section";
import {connect} from "react-redux";
import {protectedRoute} from "../utils/wrapper";
import {changeRouteInfo} from "../actions/application";
import {isEmpty} from "../utils/general";
import {CSSTransitionGroup} from "react-transition-group";

@connect()
@protectedRoute
export default class Index extends Component {

    componentWillMount() {
        this.props.dispatch(changeRouteInfo({}));
    }

    render() {
        const {tracks} = this.props;

        let trackElement = null;
        if(!isEmpty(tracks)) {
            trackElement = tracks.filter(t => t.position === 0)
                .map(t => (
                    <Track
                        albumart={t.song.imageMedium}
                        name={t.song.title}
                        artist={t.song.artist}
                        duration={t.song.duration}
                    />
                ))[0];
        }

        return (
            <Section className="index-route" scrollable={false}>
                <CSSTransitionGroup
                    transitionName="index-track"
                    transitionAppear={false}
                    transitionAppearTimeout={500}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}>
                {trackElement}
                </CSSTransitionGroup>
            </Section>
        );
    }
}