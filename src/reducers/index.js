import {combineReducers} from "redux";
import {routerReducer as router} from "react-router-redux";
import {firebaseStateReducer as firebase} from "react-redux-firebase";
import { i18nReducer as i18n } from 'react-redux-i18n';
import application from "./application";

export default combineReducers({
    application,
    router,
    firebase,
    i18n
})