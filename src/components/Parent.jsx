import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {
    activePageSelector,
    addChildActionCreator,
    childCollectionSelector,
    isAuthenticatedSelector
} from "../features";
import Child from "./Child";

export default function Parent(){
    const dispatch = useDispatch();
    /**
     * global state
     */
    const childCollection = useSelector(childCollectionSelector);
    const isAuthenticated = useSelector(isAuthenticatedSelector);
    const activePage = useSelector(activePageSelector);
    /**
     * local state
     */
    const [isNewChildFocused,setIsNewChildFocused] = useState(false);
    const [newChild,setNewChild] = useState('');
    const [errorMessage,setErrorMessage] = useState('');
    const [searchChild,setSearchChild] = useState('');
    const [childDeletedMessage,setChildDeletedMessage] = useState('');
    const [grandChildMessages,setGrandChildMessages] = useState([]);
    const [nChildCollection,setNChildCollection] = useState([]);
    const [sortDirection,setSortDirection] = useState('asc');
    const [sortField,setSortField] = useState('id');
    /**
     * immutables
     */
    const helpMessage = 'English letters; digits; whitespace; min. 3 characters; max. 30 characters';
    const newChildLabel = 'new child';
    const searchChildLabel = 'search for child(ren)';
    const listChildLabel = 'children';
    const newChildBtnLabel = 'add';
    const searchStartLabel = 'starts with';
    const searchIncludeLabel = 'includes';
    const searchEndLabel = 'ends with';
    const searchOption = 'starts';
    const sortDirectionLabel = 'sort direction';
    const sortDirectionLabelAsc = 'up';
    const sortDirectionLabelDesc = 'down';
    const sortFieldLabel = 'sort field';
    const sortFieldLabelId = 'id';
    const sortFieldLabelIdentifier = 'name';
    /**
     * local functions
     */
    function onFocus(){
        setIsNewChildFocused(true);
        setErrorMessage('');
    }
    function onNew(){
        const newChild = newChild.toLowerCase().trim();
        const isAlready = childCollection.find(child => child.identifier.toLowerCase() === newChild);
        setIsNewChildFocused(false);
        if(isAlready){
            setErrorMessage('the child already exists');
        } else if(!isValid(newChild)) {
            setIsNewChildFocused(true);
            setErrorMessage('is not valid');
        } else {
            setErrorMessage('');
            dispatch(addChildActionCreator(newChild));
            onSearch();
            setNewChild('');
        }
    }
    function isValid(newChild){
        const regExp = new RegExp('^[\\w\\s]{3,30}$','g');
        return regExp.test(newChild);
    }
    function onSearch(){
        const shallChild = searchChild.toLowerCase().trim();
        const nChildCollection = childCollection.filter(child => {
            const isChild = child.identifier.toLowerCase();
            switch(searchOption){
                case 'starts':
                    return isChild.startsWith(shallChild);
                case 'includes':
                    return isChild.includes(shallChild);
                case 'ends':
                    return isChild.endsWith(shallChild);
            }
        });
        setNChildCollection(nChildCollection);
        this.sort();
    }
    function sort(){
        const sortDirections = {
            asc: (a, b) => {
                if(a[sortField] > b[sortField]){
                    return 1;
                } else if(a[sortField] < b[sortField]){
                    return -1;
                } else {
                    return 0;
                }
            },
            desc: (a, b) => {
                if(a[sortField] < b[sortField]){
                    return 1;
                } else if(a[sortField] > b[sortField]){
                    return -1;
                } else {
                    return 0;
                }
            }
        };
        nChildCollection.sort(sortDirections[sortDirection]);
    }
    function onChildDeleted({message,id}){
        setChildDeletedMessage(`child No. ${id}: ${message}`);
        setTimeout(function(){
            setChildDeletedMessage('');
        },3000);
    }
    /**
     * useEffect
     */
    useEffect(() => {
        setNChildCollection(childCollection);
        sort();
    },[childCollection]);
    return (
        <div id="parent">
            <div>form 01: { newChildLabel }</div>
            <div>
                { isNewChildFocused && (<div>{ helpMessage }</div>) }
                <input type="text" value={ newChild } onClick={ onFocus } maxLength="30" />
                <button onClick={ onNew }>{ newChildBtnLabel }</button>
                { errorMessage && (<div>{ errorMessage }</div>) }
            </div>
            <div>form 02: { searchChildLabel }</div>
            <div>
                <input type="search" value={ searchChild } onKeyUp={ onSearch } />
                <label><input type="radio" value="starts" onChange={ searchOption } />{ searchStartLabel }</label>
                <label><input type="radio" value="includes" onChange={ searchOption } />{ searchIncludeLabel }</label>
                <label><input type="radio" value="ends" onChange={ searchOption } />{ searchEndLabel }</label>
                <label>
                    { sortDirectionLabel }
                    <select onChange={ sortDirection } >
                        <option value="asc">{ sortDirectionLabelAsc }</option>
                        <option value="desc">{ sortDirectionLabelDesc }</option>
                    </select>
                    { sortFieldLabel }
                    <select onChange={ sortField }>
                        <option value="id">{ sortFieldLabelId }</option>
                        <option value="identifier">{ sortFieldLabelIdentifier }</option>
                    </select>
                </label>
            </div>
            <div>list: { listChildLabel }</div>
            { childDeletedMessage && (<div>{ childDeletedMessage }</div>) }
            <Child childCollection={ nChildCollection } childDeleted={ onChildDeleted } />
        </div>
    );
}