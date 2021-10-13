import React, {useEffect, useState} from 'react';
import Parent from '../components/Parent';
import {useParams} from 'react-router-dom';

export default function Page01(){
    const {reason} = useParams();
    const [reasonMessage,setReasonMessage] = useState('');

    function onReason(){
        if(typeof reason !== 'undefined' && reasonMessage !== ''){
            setReasonMessage(reason);
            setTimeout(function(){
                setReasonMessage('');
            },3000);
        } else {
            setReasonMessage('');
        }
    }

    useEffect(() => {
        onReason();
    },[reasonMessage]);

    return(
        <div id="page01">
            {reasonMessage && (<div>{ reasonMessage }</div>)}
            <Parent />
        </div>
    );
}