import React, {useEffect, useState, useCallback} from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {
    activePageActionCreator, activePageSelector,
    isAuthenticatedActionCreator, isAuthenticatedSelector,
    PrivateRoute
} from './features';
import Page01 from './views/Page01';
import Page02 from './views/Page02';
import './style/App.scss';

export default function App(){
    const dispatch = useDispatch();
    const [state, setState] = useState({
        isAuthenticated: useSelector(isAuthenticatedSelector),
        activePage: useSelector(activePageSelector),
        page03Message: 'Page 03 is private: first authenticate to see the content'
    });
    const privatePage = 'page03';

    function onAuthenticate() {
        dispatch(isAuthenticatedActionCreator(true));
        setState({...state, isAuthenticated: true});
    }

    function onPage(event){
        const shallPage = event.target.id;
        setPage(shallPage);
    }
    const setPage = useCallback((shallPage) => {
        if(shallPage !== privatePage || (shallPage === privatePage && state.isAuthenticated)){
            dispatch(activePageActionCreator(shallPage));
            setState(state => ({...state, activePage: shallPage}));
        }
    },[state.isAuthenticated,dispatch]);

    function setHistoryPush(shallPage){
        setPage(shallPage);
    }
    function isActive(shallPage){
        return shallPage === state.activePage ? 'active' : '';
    }

    const authLabel = 'please authenticate';
    const page01Label = 'Page 01';
    const page02Label = 'Page 02';

    useEffect(() => {
        const pathname = window.location.pathname.substr(1);
        let shallPage;
        switch (pathname){
            case 'page02':
            case 'page03':
                shallPage = pathname;
                break;
            default:
                shallPage = 'page01';
                break;
        }
        setPage(shallPage);
    }, [setPage]);

    useEffect(() => {
        function setAuthenticate(){
            const label = state.isAuthenticated ? 'Page 03' : state.page03Message;
            setState(state => ({...state, page03Message: label}));
        }
        setAuthenticate();
    }, [state.isAuthenticated,state.page03Message]);

    return (
        <BrowserRouter>
            <div id="nav">
                <Link to="/" id="page01" className={ isActive('page01') } onClick={onPage}>{page01Label}</Link>
                <Link to="/page02" id="page02" className={ isActive('page02') } onClick={onPage}>{page02Label}</Link>
                <Link to="/page03" id="page03" className={ isActive('page03') } onClick={onPage}>{state.page03Message}</Link>
                { !state.isAuthenticated && (<button onClick={ onAuthenticate }>{authLabel}</button>) }
            </div>
            <Switch>
                <Route exact path="/">
                    <Page01 />
                </Route>
                <Route path="/page02">
                    <Page02 onHistoryPush={setHistoryPush} />
                </Route>
                <PrivateRoute
                    isAuthenticated={state.isAuthenticated}
                    page={{name: 'page03', path:'/page03', props:{}}}
                />
            </Switch>
        </BrowserRouter>
    );
}
