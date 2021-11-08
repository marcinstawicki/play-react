import React from 'react';
import style from '../style/Page03.module.scss';

class Page03 extends React.Component {
    render(){
        const message = 'this is page 03 and its private content is shown after user has been authenticated';
        return(
            <div id={style["page03"]}>
                <div>{message}</div>
            </div>
        );
    }
}
export default (Page03);