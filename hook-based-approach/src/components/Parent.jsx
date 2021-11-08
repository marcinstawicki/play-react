import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    addChildActionCreator, childCollectionSelector,
} from "../features";
import Child from "./Child";
import style from '../style/Parent.module.scss';

function Parent(props){

    let childCollection = useSelector(childCollectionSelector);
    const dispatch = useDispatch();
    const [state, setState] = useState({
        isNewChildFocused: false,
        newChild: '',
        errorMessage: '',
        searchChild: '',
        searchOption: 'starts',
        childDeletedMessage: '',
        grandChildMessages: [],
        nChildCollection: [],
        sortDirection: 'asc',
        sortField: 'id',
        childCollection: childCollection
    });
    const helpMessage = 'English letters; digits; whitespace; min. 3 characters; max. 30 characters';
    const newChildLabel = 'new child';
    const searchChildLabel = 'search for child(ren)';
    const listChildLabel = 'children';
    const newChildBtnLabel = 'add';
    const searchStartLabel = 'starts with';
    const searchIncludeLabel = 'includes';
    const searchEndLabel = 'ends with';
    const sortDirectionLabel = 'sort direction';
    const sortDirectionLabelAsc = 'up';
    const sortDirectionLabelDesc = 'down';
    const sortFieldLabel = 'sort field';
    const sortFieldLabelId = 'id';
    const sortFieldLabelIdentifier = 'name';

    function onFocus(){
        setState(state => ({
            ...state,
            isNewChildFocused: true,
            errorMessage: '',
        }));
    }
    function onNew(){
        const newChild = state.newChild.toLowerCase().trim();
        const isAlready = state.childCollection.find(child => child.identifier.toLowerCase() === newChild);
        if(isAlready){
            setState({
                ...state,
                setIsNewChildFocused: false,
                errorMessage: 'the child already exists'
            });
        } else if(!isValid(newChild)) {
            setState({
                ...state,
                setIsNewChildFocused: true,
                errorMessage: 'is not valid'
            });
        } else {
            dispatch(addChildActionCreator(newChild));
            const nCollection = childCollection;
            setState({
                ...state,
                setIsNewChildFocused: false,
                childCollection: nCollection,
                nChildCollection: nCollection,
                errorMessage: '',
                newChild: ''
            });
        }
    }
    function isValid(newChild){
        const regExp = new RegExp('^[\\w\\s]{3,30}$','g');
        return regExp.test(newChild);
    }
    function onChildDeleted(){
        return ({message,id}) => {
            window.setTimeout(() => {
                setState(state => ({...state, childDeletedMessage: ''}));
            },3000);
            setState(state => ({...state, childDeletedMessage: `child No. ${id}: ${message}`}));
        }
    }
    function setNewChild(event) {
        setState({...state, newChild: event.target.value });
    }
    function setSearchChild(event) {
        setState({...state, searchChild: event.target.value });
    }
    function setSearchOption(event){
        setState({...state, searchOption: event.target.value});
    }
    function isSearchOption(shallValue){
        return shallValue === state.searchOption;
    }
    function setSortDirection(event){
        setState({...state, sortDirection: event.target.value});
    }
    function setSortField(event){
        setState({...state, sortField: event.target.value});
    }

    useEffect(() => {
        function onSearch(){
            const shallChild = state.searchChild.toLowerCase().trim();
            const nChildCollection = state.childCollection.filter(child => {
                const isChild = child.identifier.toLowerCase();
                switch(state.searchOption){
                    default:
                    case 'starts':
                        return isChild.startsWith(shallChild);
                    case 'includes':
                        return isChild.includes(shallChild);
                    case 'ends':
                        return isChild.endsWith(shallChild);
                }
            });
            setState(state => ({...state, nChildCollection}));
        }
        onSearch();
    }, [state.childCollection,state.searchChild,state.searchOption,state.sortField,state.sortDirection]);

    useEffect(() => {
        function sort(){
            const sortDirections = {
                asc: (a, b) => {
                    if(a[state.sortField] > b[state.sortField]){
                        return 1;
                    } else if(a[state.sortField] < b[state.sortField]){
                        return -1;
                    } else {
                        return 0;
                    }
                },
                desc: (a, b) => {
                    if(a[state.sortField] < b[state.sortField]){
                        return 1;
                    } else if(a[state.sortField] > b[state.sortField]){
                        return -1;
                    } else {
                        return 0;
                    }
                }
            };
            let collection = state.nChildCollection;
            collection.sort(sortDirections[state.sortDirection]);
            setState(state => ({...state, nChildCollection: collection}));
        }
        sort();
    }, [state.nChildCollection,state.sortField,state.sortDirection]);

    useEffect(() => {
        setState(state => ({
            ...state,
            childCollection: childCollection,
            nChildCollection: childCollection
        }));
    }, [childCollection]);

    return (
        <div id={style["parent"]}>
            <div>form 01: { newChildLabel }</div>
            <div>
                { state.isNewChildFocused && (<div>{ helpMessage }</div>) }
                <input type="text" value={ state.newChild } onFocus={ onFocus }
                       onChange={setNewChild}
                       maxLength="30" />
                <button onClick={ onNew }>{ newChildBtnLabel }</button>
                { state.errorMessage && (<div>{ state.errorMessage }</div>) }
            </div>
            <div>form 02: { searchChildLabel }</div>
            <div>
                <input type="search" value={ state.searchChild } onChange={setSearchChild} />
                <label><input type="radio" value="starts" checked={isSearchOption('starts')} onChange={ setSearchOption } />{ searchStartLabel }</label>
                <label><input type="radio" value="includes" checked={isSearchOption('includes')} onChange={ setSearchOption } />{ searchIncludeLabel }</label>
                <label><input type="radio" value="ends" checked={isSearchOption('ends')} onChange={ setSearchOption } />{ searchEndLabel }</label>
                <label>
                    { sortDirectionLabel }
                    <select onChange={ setSortDirection } >
                        <option value="asc">{ sortDirectionLabelAsc }</option>
                        <option value="desc">{ sortDirectionLabelDesc }</option>
                    </select>
                    { sortFieldLabel }
                    <select onChange={ setSortField }>
                        <option value="id">{ sortFieldLabelId }</option>
                        <option value="identifier">{ sortFieldLabelIdentifier }</option>
                    </select>
                </label>
            </div>
            <div>list: { listChildLabel }</div>
            { state.childDeletedMessage && (<div className={style.msg}>{ state.childDeletedMessage }</div>) }
            <Child childCollection={ state.nChildCollection } childDeleted={ onChildDeleted() } />
        </div>
    );
}
export default Parent;