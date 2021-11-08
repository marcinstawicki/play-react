import {Redirect, Route} from "react-router-dom";
import React from "react";
import {store} from "../app/store";
import Page03 from '../views/Page03';

export function childCollectionReducer(state = [],action){
    switch (action.type) {
        case 'addChildAction':
            const ids = state.map(child => child.id);
            let lastID = 0;
            if(ids.length > 0){
                lastID = Math.max(...ids);
            }
            const child = {identifier: action.payload, id: ++lastID};
            return [...state,child];
        case 'deleteChildAction':
            return [...state.filter(child => child.id !== action.payload)];
        default:
            return state;
    }
}
export function isAuthenticatedReducer(state = false, action){
    switch (action.type) {
        case 'isAuthenticatedAction':
            return action.payload;
        default:
            return state;
    }
}
export function activePageReducer(state = 'page01', action){
    switch (action.type) {
        case 'activePageAction':
            return action.payload;
        default:
            return state;
    }
}

export function addChildActionCreator(payload){
    return {
        type: 'addChildAction',
        payload
    };
}
export function deleteChildActionCreator(payload){
    return {
        type: 'deleteChildAction',
        payload
    };
}
export function isAuthenticatedActionCreator(payload){
    return {
        type: 'isAuthenticatedAction',
        payload
    };
}
export function activePageActionCreator(payload){
    return {
        type: 'activePageAction',
        payload
    };
}

export function PrivateRoute(props){
    const privateComponents = {
        'page03': Page03
    };
    return (
        <Route path={props.page.path} render={
            () => {
                if(props.isAuthenticated) {
                    const Page = privateComponents[props.page.name];
                    return (<Page {...props.page.props} />);
                } else {
                    const state = store.getState();
                    const page = state.activePage === 'page01' ? '/' : state.activePage;
                    return (<Redirect to={{pathname: page}} />);
                }
            }}
        />
    );
}
