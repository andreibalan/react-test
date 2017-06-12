import {applyMiddleware, createStore, compose} from "redux";
import {routerMiddleware} from "react-router-redux";
import {reactReduxFirebase} from "react-redux-firebase";
import createHistory from "history/createBrowserHistory";
import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import reducer from "./reducers";
import {Firebase} from "./constants";
import {loadTranslations, setLocale, syncTranslationWithStore} from "react-redux-i18n";
import translations from "./locales";

const firebaseProfileConfig = {
    userProfile: 'users',
    // profileParamsToPopulate: [
    //     'location:locations'
    // ]
};

const internalHistory = createHistory();
const middleware = applyMiddleware(promise(), thunk, routerMiddleware(internalHistory), logger);
const createComposeStore = compose(reactReduxFirebase(Firebase.Config, firebaseProfileConfig))(createStore);

export const store = createComposeStore(reducer, middleware), history = internalHistory;

syncTranslationWithStore(store);

const locales = Object.keys(translations);
const browserLocale = navigator.language || navigator.userLanguage || 'en';

store.dispatch(loadTranslations(translations));
if (locales.indexOf(browserLocale) > -1) {
    store.dispatch(setLocale(browserLocale));
} else if (browserLocale.length > 2 && locales.indexOf(browserLocale.substring(0, 2)) > -1) {
    store.dispatch(setLocale(browserLocale.substring(0, 2)));
} else {
    store.dispatch(setLocale("en"));
}