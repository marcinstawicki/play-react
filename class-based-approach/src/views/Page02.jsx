import React from 'react';
import {withRouter} from "react-router-dom";
import style from '../style/Page02.module.scss';
import PropTypes from "prop-types";

class Page02 extends React.Component {
    constructor(props) {
        super(props);
        this.onRedirect = this.onRedirect.bind(this);
    }
    onRedirect(){
        /**
         * this goes to App component
         */
        this.props.onHistoryPush('page01');
        /**
         * this goes to page01 component
         */
        this.props.history.push('/',  { reason: 'coming from page 02' });
    }
    render(){
        const header = 'this is page 02 and its public content is shown after user has navigated to it';
        const redirectBtnLabel = 'redirect to page 01';
        return(
            <div id={style["page02"]}>
                <div>{header}</div>
                <button onClick={this.onRedirect}>{redirectBtnLabel}</button>
            </div>
        );
    }
}
Page02.propTypes = {
    onHistoryPush: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
};
export default withRouter(Page02);