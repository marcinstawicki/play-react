import {Redirect, Route} from "react-router-dom";
import React from "react";
import {useDispatch} from "react-redux";

export function childCollectionReducer(state = [],{type, payload}){
    switch (type) {
        case '':
            return { ...state}
        case '':
            return { ...state}
        default:
            return state
    }
}
export function isAuthenticatedReducer(state = false, {type, payload}){
    switch (action.type) {
        case '':
            return { ...state}
        case '':
            return { ...state}
        default:
            return state
    }
}
export function activePageReducer(state = 'page01', {type, payload}){
    switch (action.type) {
        case '':
            return { ...state}
        case '':
            return { ...state}
        default:
            return state
    }
}

export const childCollectionSelector = state => state.childCollection;
export const isAuthenticatedSelector = state => state.isAuthenticated;
export const activePageSelector = state => state.activePage;

export const ADD_CHILD_ACTION = 'addChildAction';
export const DELETE_CHILD_ACTION = 'deleteChildAction';
export const IS_AUTHENTICATED_ACTION = 'isAuthenticatedAction';
export const ACTIVE_PAGE_ACTION = 'activePageAction';

export function addChildActionCreator(payload){
    return {
        type: ADD_CHILD_ACTION,
        payload
    };
}
export function deleteChildActionCreator(payload){
    return {
        type: DELETE_CHILD_ACTION,
        payload
    };
}
export function isAuthenticatedActionCreator(payload){
    return {
        type: IS_AUTHENTICATED_ACTION,
        payload
    };
}
export function activePageActionCreator(payload){
    return {
        type: ACTIVE_PAGE_ACTION,
        payload
    };
}

export function PrivateRoute({isAuthenticated,path,componentName,componentProps}){
    const dispatch = useDispatch();
    return (
        <Route path={path} render={
            (props) => {
                if(isAuthenticated) {
                    return (<componentName {...componentProps} />);
                } else {
                    dispatch(activePageActionCreator('page01'));
                    return (<Redirect to={{pathname: '/'}} />)
                }
            }}
        />
    );
}
