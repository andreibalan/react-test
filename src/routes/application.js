import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import TitleBar from "../components/titlebar";
import Info from "../components/info";
import Button from "../components/button";
import Dialog from "../components/dialog";
import Message from "../components/message";
import Index from "./index";
import Login from "./login";
import About from "./about";
import Settings from "./settings";
import NotFound from "./notFound";
import classNames from "classnames";
import {connect} from "react-redux";
import {logout} from "../actions/application";
import {firebaseConnect, isLoaded, dataToJS, populatedDataToJS, pathToJS} from "react-redux-firebase";
import {isEmpty} from "../utils/general";
import {routerActions} from "react-router-redux";
import NProgress from "react-nprogress";
import {Translate, I18n} from "react-redux-i18n";

@connect(({application, firebase}) => ({
    authError: pathToJS(firebase, 'authError'),
    auth: pathToJS(firebase, 'auth'),
    profile: pathToJS(firebase, 'profile'),
    application: application
}))
@firebaseConnect((props) => [`/locations#orderByChild=id&equalTo=${props.profile && props.profile.location ? props.profile.location : ''}`])
@connect(({firebase}) => {
    const locations = dataToJS(firebase, 'locations');
    const data = {};

    if (!isEmpty(locations)) {
        data.pubLocation = Object.values(locations)[0];
    }

    return data;
})
@firebaseConnect((props) => {
    let playlistId = props.pubLocation && props.pubLocation.playlists ? Object.keys(props.pubLocation.playlists)[0] : null;

    return [
        `/playlists#orderByChild=id&equalTo=${playlistId}`,
        `/tracks#orderByChild=playlist&equalTo=${playlistId}&populate=song:songs`,
    ];
})
@connect(({firebase}) => {
    const playlists = dataToJS(firebase, 'playlists');
    const tracks = populatedDataToJS(firebase, 'tracks', [{child: 'song', root: 'songs'}]);
    const data = {};

    if (!isEmpty(playlists)) {
        data.playlist = Object.values(playlists)[0];
    }

    if (!isEmpty(tracks)) {
        data.tracks = Object.values(tracks);
    }

    return data;
})
export default class Application extends Component {
    constructor(props) {
        super(props);

        this.state = {
            color: '#ffffff',
            backgroundColor: '#000000'
        };

        this.handlePresenterClick = this.handlePresenterClick.bind(this);
        this.doLogoutWithConfirmation = this.doLogoutWithConfirmation.bind(this);
        this.doLogout = this.doLogout.bind(this);
        this.cancelLogout = this.cancelLogout.bind(this);
        this.isContentLoaded = this.isContentLoaded.bind(this);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    handlePresenterClick() {
        const {application, dispatch} = this.props;

        if (application.routeInfo.canGoBack) {
            dispatch(routerActions.goBack());
        }
    }

    isContentLoaded() {
        const {auth, tracks, playlist, pubLocation} = this.props;
        return !auth || (isLoaded(pubLocation) && isLoaded(playlist) && isLoaded(tracks));
    }

    doLogoutWithConfirmation() {
        if (!this.props.auth) {
            return;
        }

        this.props.dispatch(logout(true));
    }

    doLogout() {
        if (!this.props.auth) {
            return;
        }

        this.props.dispatch(logout(false));
        this.props.firebase.logout();
    }

    cancelLogout() {
        if (!this.props.auth) {
            return;
        }

        this.props.dispatch(logout(false));
    }

    render() {
        const {auth, application, tracks, pubLocation} = this.props;
        const isContentLoaded = this.isContentLoaded();

        if (!isContentLoaded) {
            NProgress.start()
        } else {
            NProgress.done();
        }

        const classes = classNames(
            'application',
            {
                'scrolled': application.isSectionScrolled
            }
        );

        const style = {
            color: this.state.color,
            backgroundColor: this.state.backgroundColor
        };

        const backgroundStyle = {};

        if (!isEmpty(tracks)) {
            const currentSong = tracks.filter(t => t.position === 0).map(t => t.song)[0];

            if (!isEmpty(currentSong)) {
                // style.color = currentSong.colorLightVibrant;
                style.backgroundColor = currentSong.colorDarkMuted;
                backgroundStyle.backgroundImage = `url(${currentSong.imageMedium})`;
            }
        }

        let routeInfo = {
            title: null,
            description: null,
            canGoBack: false
        };

        if (!isEmpty(application.routeInfo.title)) {
            routeInfo = application.routeInfo;
        } else if (!isEmpty(pubLocation)) {
            Object.assign(routeInfo, {
                title: pubLocation.name,
                description: pubLocation.description
            });
        }

        // TitleBar
        let titleBarElement = null;
        if (auth && isContentLoaded) {
            titleBarElement = (
                <TitleBar
                    className="appbar"
                    icon={routeInfo.canGoBack ? 'arrow-left' : null}
                    title={routeInfo.title}
                    description={routeInfo.description}
                    onPresenterClick={this.handlePresenterClick}
                    actionElements={[
                        <Info key="action-about" icon="info-circle"
                              onClick={() => this.props.dispatch(routerActions.push('/about'))}/>,
                        <Info key="action-settings" icon="gear"
                              onClick={() => this.props.dispatch(routerActions.push('/settings'))}/>,
                        <Info key="action.logout" icon="unlock-alt" onClick={this.doLogoutWithConfirmation}/>
                    ]}
                />
            );
        }

        // Logout Dialog
        let logoutDialog = null;
        if (application.isLogoutDialogVisible && auth) {
            logoutDialog = (
                <Dialog
                    title={<Translate value="application.logoutTitle"/>}
                    buttons={[
                        <Button
                            key="cancel-btn"
                            label={<Translate value="no"/>}
                            onClick={this.cancelLogout}/>,
                        <Button
                            key="login-btn"
                            label={<Translate value="yes"/>}
                            primary={true}
                            onClick={this.doLogout}/>
                    ]}
                    dismissible={true}
                    onDismiss={this.cancelLogout}>
                    <Translate value="application.logoutDescription"/>
                </Dialog>
            );
        }


        return (
            <div className={classes} style={style}>
                <div className="background" style={backgroundStyle}/>

                {logoutDialog}
                {titleBarElement}

                {!isContentLoaded ? (
                        <Message
                            loading={true}
                            title={<Translate value="loading.title"/>}
                            description={<Translate value="loading.appDescription"/>}/>
                    ) : (
                        <Switch>
                            <Route exact path="/" render={(props) => <Index tracks={tracks} {...props}/>}/>
                            <Route path="/about" component={About}/>
                            <Route path="/settings" component={Settings}/>
                            <Route path="/login" component={Login}/>

                            <Route component={NotFound}/>
                        </Switch>
                    )}
            </div>
        );
    }
}