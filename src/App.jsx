import React, {useState, useEffect} from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {
    activePageActionCreator,
    activePageSelector,
    isAuthenticatedActionCreator,
    isAuthenticatedSelector,
    PrivateRoute
} from './features';
import Page01 from './views/Page01';
import Page02 from './views/Page02';
import './App.scss';

function App() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(isAuthenticatedSelector);
    const activePage = useSelector(activePageSelector);

    const [page03Message,setPage03Message] = useState('Page 03 is private: first authenticate to see the content');
    const [authLabel,setAuthLabel] = useState('please authenticate');

    function onAuthenticate() {
        dispatch(isAuthenticatedActionCreator(true));
    }
    function isPage(shallPage){
        if(isAuthenticated){
            dispatch(activePageActionCreator(shallPage));
        }
    }

    function onActive(shallPage){
        return shallPage === activePage ? 'active' : '';
    }
    useEffect(() => {
        setPage03Message(isAuthenticated ? 'Page 03' : page03Message);
    },[isAuthenticated]);

    return (
      <BrowserRouter>
        <div id="nav">
          <Link to="/" className={ onActive('page01') } onClick={ () => isPage('page01') }>Page 01</Link>
          <Link to="/page02" className={ onActive('page02') } onClick={ () => isPage('page02') }>Page 02</Link>
          <Link to="/page03" className={ onActive('page03') } onClick={ () => isPage('page03') }>{ page03Message }</Link>
          { isAuthenticated && (<button onClick={ onAuthenticate }>{ authLabel }</button>) }
        </div>
        <Switch>
          <Route exact path="/">
              <Page01 />
          </Route>
          <Route path="/page02">
              <Page02 />
          </Route>
          <PrivateRoute
              isAuthenticated={isAuthenticated}
              componentName="Page03"
              path="/page03"
              componentProps={}
          />
        </Switch>
      </BrowserRouter>
    );
}
export default App;
