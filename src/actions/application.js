import {Actions} from "../constants";

export function logout(isDialogVisible) {
    return {
        type: Actions.Application.LOGOUT,
        payload: isDialogVisible
    }
}

export function sectionScroll(isScrolled) {
    return {
        type: Actions.Application.SECTION_SCROLL,
        payload: isScrolled
    }
}

export function changeRouteInfo(routeInfo) {
    const defaultRouteInfo = {
        title: null,
        description: null,
        canGoBack: false
    };

    return {
        type: Actions.Application.ROUTE_CHANGE,
        payload: {...defaultRouteInfo, ...routeInfo}
    }
}