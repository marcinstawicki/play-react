import React from 'react';
import {connect} from "react-redux";
import {
    addChildActionCreator,
} from "../features";
import Child from "./Child";
import style from '../style/Parent.module.scss';
import PropTypes from "prop-types";

class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
            childCollection: this.props.childCollectionSelector
        };
        this.onFocus = this.onFocus.bind(this);
        this.onNew = this.onNew.bind(this);
        this.isValid = this.isValid.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.sort = this.sort.bind(this);
        this.onChildDeleted = this.onChildDeleted.bind(this);
        this.setSearchOption = this.setSearchOption.bind(this);
        this.isSearchOption = this.isSearchOption.bind(this);
        this.setSortDirection = this.setSortDirection.bind(this);
        this.setSortField = this.setSortField.bind(this);
        this.setNewChild = this.setNewChild.bind(this);
        this.setSearchChild = this.setSearchChild.bind(this);
        this.timeOut = null;
    }
    onFocus(){
        this.setState({
            isNewChildFocused: true,
            errorMessage: '',
            searchChild: ''
        });
    }
    onNew(){
        const newChild = this.state.newChild.toLowerCase().trim();
        const isAlready = this.state.childCollection.find(child => child.identifier.toLowerCase() === newChild);
        if(isAlready){
            this.setState({
                setIsNewChildFocused: false,
                errorMessage: 'the child already exists'
            });
        } else if(!this.isValid(newChild)) {
            this.setState({
                setIsNewChildFocused: true,
                errorMessage: 'is not valid'
            });
        } else {
            this.props.addChildAction(newChild);
        }
    }
    isValid(newChild){
        const regExp = new RegExp('^[\\w\\s]{3,30}$','g');
        return regExp.test(newChild);
    }
    onSearch(){
        const shallChild = this.state.searchChild.toLowerCase().trim();
        const nChildCollection = this.state.childCollection.filter(child => {
            const isChild = child.identifier.toLowerCase();
            switch(this.state.searchOption){
                default:
                case 'starts':
                    return isChild.startsWith(shallChild);
                case 'includes':
                    return isChild.includes(shallChild);
                case 'ends':
                    return isChild.endsWith(shallChild);
            }
        });
        this.setState({nChildCollection});
    }
    sort(){
        const sortDirections = {
            asc: (a, b) => {
                if(a[this.state.sortField] > b[this.state.sortField]){
                    return 1;
                } else if(a[this.state.sortField] < b[this.state.sortField]){
                    return -1;
                } else {
                    return 0;
                }
            },
            desc: (a, b) => {
                if(a[this.state.sortField] < b[this.state.sortField]){
                    return 1;
                } else if(a[this.state.sortField] > b[this.state.sortField]){
                    return -1;
                } else {
                    return 0;
                }
            }
        };
        let collection = this.state.nChildCollection;
        collection.sort(sortDirections[this.state.sortDirection]);
        this.setState({nChildCollection: collection});
    }
    onChildDeleted(){
        return ({message,id}) => {
            this.timeOut = window.setTimeout(() => {
                this.setState({childDeletedMessage: ''});
            },3000);
            this.setState({childDeletedMessage: `child No. ${id}: ${message}`});
        }
    }
    setNewChild(event) {
        this.setState({newChild: event.target.value });
    }
    setSearchChild(event) {
        this.setState({searchChild: event.target.value });
    }
    setSearchOption(event){
        this.setState({searchOption: event.target.value});
    }
    isSearchOption(shallValue){
        return shallValue === this.state.searchOption;
    }
    setSortDirection(event){
        this.setState({sortDirection: event.target.value});
    }
    setSortField(event){
        this.setState({sortField: event.target.value});
    }
    render(){
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
        return (
            <div id={style["parent"]}>
                <div>form 01: { newChildLabel }</div>
                <div>
                    { this.state.isNewChildFocused && (<div>{ helpMessage }</div>) }
                    <input type="text" value={ this.state.newChild } onFocus={ this.onFocus }
                           onChange={this.setNewChild}
                           maxLength="30" />
                    <button onClick={ this.onNew }>{ newChildBtnLabel }</button>
                    { this.state.errorMessage && (<div>{ this.state.errorMessage }</div>) }
                </div>
                <div>form 02: { searchChildLabel }</div>
                <div>
                    <input type="search" value={ this.state.searchChild } onChange={this.setSearchChild} />
                    <label><input type="radio" value="starts" checked={this.isSearchOption('starts')} onChange={ this.setSearchOption } />{ searchStartLabel }</label>
                    <label><input type="radio" value="includes" checked={this.isSearchOption('includes')} onChange={ this.setSearchOption } />{ searchIncludeLabel }</label>
                    <label><input type="radio" value="ends" checked={this.isSearchOption('ends')} onChange={ this.setSearchOption } />{ searchEndLabel }</label>
                    <label>
                        { sortDirectionLabel }
                        <select onChange={ this.setSortDirection } >
                            <option value="asc">{ sortDirectionLabelAsc }</option>
                            <option value="desc">{ sortDirectionLabelDesc }</option>
                        </select>
                        { sortFieldLabel }
                        <select onChange={ this.setSortField }>
                            <option value="id">{ sortFieldLabelId }</option>
                            <option value="identifier">{ sortFieldLabelIdentifier }</option>
                        </select>
                    </label>
                </div>
                <div>list: { listChildLabel }</div>
                { this.state.childDeletedMessage && (<div className={style.msg}>{ this.state.childDeletedMessage }</div>) }
                <Child childCollection={ this.state.nChildCollection } childDeleted={ this.onChildDeleted() } />
            </div>
        );
    }
    componentDidMount() {
        this.setState({nChildCollection: this.state.childCollection});
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.searchChild !== this.state.searchChild ||
            prevState.searchOption !== this.state.searchOption ||
            prevState.sortField !== this.state.sortField ||
            prevState.sortDirection !== this.state.sortDirection
        ){
            this.onSearch();
        }
        if(prevState.nChildCollection !== this.state.nChildCollection){
            this.sort();
        }
        if(prevProps.childCollectionSelector !== this.props.childCollectionSelector){
            const nCollection = this.props.childCollectionSelector;
            this.setState({
                setIsNewChildFocused: false,
                childCollection: nCollection,
                nChildCollection: nCollection,
                errorMessage: '',
                newChild: ''
            });
        }
    }
    componentWillUnmount() {
        window.clearTimeout(this.timeOut);
    }
}
function mapStateToProps(state){
    return {
        childCollectionSelector: state.childCollection
    }
}
function mapDispatchToProps(dispatch){
    return {
        addChildAction: (newChild) => {
            dispatch(addChildActionCreator(newChild));
        }
    }
}
Parent.propTypes = {
    childCollectionSelector: PropTypes.array.isRequired,
    addChildAction: PropTypes.func.isRequired
};
export default connect(mapStateToProps,mapDispatchToProps)(Parent);