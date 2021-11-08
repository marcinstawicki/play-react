import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import Parent from '../components/Parent';
import style from '../style/Page01.module.scss';

let timeOut = null;

function Page01() {

    const [reasonMessage, setReasonMessage] = useState('');
    const [isReason, setIsReason] = useState(true);

    let location = useLocation();


    useEffect(() => {
        if(typeof location.state !== 'undefined' && reasonMessage === '' && isReason){
            setReasonMessage(location.state.reason);
            timeOut = window.setTimeout(() =>{
                setReasonMessage('');
                setIsReason(false);
            },3000);
        }
    }, [location,reasonMessage,isReason]);

    useEffect(() => {
        return () => {
            window.clearTimeout(timeOut);
        };
    }, []);

    return(
        <div id={style["page01"]}>
            {reasonMessage && (<div id={style["msg"]}>{ reasonMessage }</div>)}
            <Parent />
        </div>
    );
}
export default Page01;
