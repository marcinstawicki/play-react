import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import {connect} from 'react-redux';
import {
    activePageActionCreator,
    isAuthenticatedActionCreator,
    PrivateRoute
} from './features';
import Page01 from './views/Page01';
import Page02 from './views/Page02';
import './style/App.scss';
import PropTypes from "prop-types";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: this.props.isAuthenticatedSelector,
            activePage: this.props.activePageSelector,
            page03Message: 'Page 03 is private: first authenticate to see the content'
        };
        this.onAuthenticate = this.onAuthenticate.bind(this);
        this.onPage = this.onPage.bind(this);
        this.setPage = this.setPage.bind(this);
        this.isActive = this.isActive.bind(this);
        this.setHistoryPush = this.setHistoryPush.bind(this);
    }
    onAuthenticate() {
        this.props.isAuthenticatedAction(true);
        this.setState({isAuthenticated:true});
    }
    setAuthenticate(){
        const label = this.state.isAuthenticated ? 'Page 03' : this.state.page03Message;
        this.setState({page03Message: label});
    }
    onPage(event){
        const shallPage = event.target.id;
        this.setPage(shallPage);
    }
    setPage(shallPage){
        const privatePage = 'page03';
        if(shallPage !== privatePage || (shallPage === privatePage && this.state.isAuthenticated)){
            this.props.activePageAction(shallPage);
            this.setState({activePage: shallPage});
        }
    }
    setHistoryPush(shallPage){
        this.setPage(shallPage);
    }
    isActive(shallPage){
        return shallPage === this.state.activePage ? 'active' : '';
    }
    render() {
        const authLabel = 'please authenticate';
        const page01Label = 'Page 01';
        const page02Label = 'Page 02';
        return (
            <BrowserRouter>
                <div id="nav">
                    <Link to="/" id="page01" className={ this.isActive('page01') } onClick={this.onPage}>{page01Label}</Link>
                    <Link to="/page02" id="page02" className={ this.isActive('page02') } onClick={this.onPage}>{page02Label}</Link>
                    <Link to="/page03" id="page03" className={ this.isActive('page03') } onClick={this.onPage}>{this.state.page03Message}</Link>
                    { !this.state.isAuthenticated && (<button onClick={ this.onAuthenticate }>{authLabel}</button>) }
                </div>
                <Switch>
                    <Route exact path="/">
                        <Page01 />
                    </Route>
                    <Route path="/page02">
                        <Page02 onHistoryPush={this.setHistoryPush}/>
                    </Route>
                    <PrivateRoute
                        isAuthenticated={this.state.isAuthenticated}
                        page={{name: 'page03', path:'/page03', props:{}}}
                    />
                </Switch>
            </BrowserRouter>
        );
    }
    componentDidMount() {
        this.setAuthenticate();
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
        this.setPage(shallPage);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.isAuthenticated === false && this.state.isAuthenticated === true){
            this.setAuthenticate();
        }
    }
}
App.propTypes = {
    isAuthenticatedSelector: PropTypes.bool.isRequired,
    activePageSelector: PropTypes.string.isRequired,
    isAuthenticatedAction: PropTypes.func.isRequired,
    activePageAction: PropTypes.func.isRequired
};
function mapStateToProps(state){
    return {
        isAuthenticatedSelector: state.isAuthenticated,
        activePageSelector: state.activePage,
    }
}
function mapDispatchToProps(dispatch){
    return {
        isAuthenticatedAction: (isAuthenticated) => {
            dispatch(isAuthenticatedActionCreator(isAuthenticated));
        },
        activePageAction: (shallPage) => {
            dispatch(activePageActionCreator(shallPage));
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
