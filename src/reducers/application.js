import {Actions} from "../constants";

const initialState = {
    isLogoutDialogVisible: false,
    isSectionScrolled: false,
    routeInfo: {
        title: null,
        description: null,
        canGoBack: false
    }
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        default: {
            return state;
        }

        case Actions.Application.LOGOUT: {
            return {...state, isLogoutDialogVisible: action.payload};
        }

        case Actions.Application.SECTION_SCROLL: {
            return {...state, isSectionScrolled: action.payload}
        }

        case Actions.Application.ROUTE_CHANGE: {
            return {...state, routeInfo: action.payload}
        }
    }
}