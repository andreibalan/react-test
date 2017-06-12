import {UserAuthWrapper} from "redux-auth-wrapper";
import {pathToJS} from "react-redux-firebase";
import {routerActions} from "react-router-redux";

export const protectedRoute = UserAuthWrapper({
    wrapperDisplayName: 'protectedRoute',
    authSelector: ({firebase}) => pathToJS(firebase, 'auth'),
    authenticatingSelector: ({firebase}) =>
    pathToJS(firebase, 'isInitializing') === true || pathToJS(firebase, 'auth') === undefined,
    predicate: auth => auth !== null,
    redirectAction: (newLoc) => (dispatch) => {
        dispatch(routerActions.replace('/login'));
    }
});

export const unprotectedRoute = UserAuthWrapper({
    wrapperDisplayName: 'unprotectedRoute',
    allowRedirectBack: false,
    failureRedirectPath: '/',
    authSelector: ({ firebase }) => pathToJS(firebase, 'auth'),
    authenticatingSelector: ({ firebase }) => pathToJS(firebase, 'isInitializing') === true,
    predicate: auth => auth === null,
    redirectAction: (newLoc) => (dispatch) => {
        dispatch(routerActions.replace('/'));
    }
});

