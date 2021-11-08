import React from 'react';
import {useHistory} from "react-router-dom";
import style from '../style/Page02.module.scss';
import PropTypes from "prop-types";

function Page02(props) {

    let history = useHistory();

    function onRedirect(){
        /**
         * this goes to App component
         */
        props.onHistoryPush('page01');
        /**
         * this goes to page01 component
         */
        history.push('/',  { reason: 'coming from page 02' });
    }
    const header = 'this is page 02 and its public content is shown after user has navigated to it';
    const redirectBtnLabel = 'redirect to page 01';
    return(
        <div id={style["page02"]}>
            <div>{header}</div>
            <button onClick={onRedirect}>{redirectBtnLabel}</button>
        </div>
    );
}
Page02.propTypes = {
    onHistoryPush: PropTypes.func.isRequired
};
export default Page02;
