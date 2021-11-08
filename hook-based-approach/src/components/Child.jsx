import React from 'react';
import {useDispatch} from "react-redux";
import PropTypes from 'prop-types';
import {deleteChildActionCreator} from '../features';
import GrandChild from './GrandChild';
import style from '../style/Child.module.scss';

function Child(props){
    const dispatch = useDispatch();

    function onDelete(id){
        props.childDeleted({ message: 'deleted successfully', id });
        dispatch(deleteChildActionCreator(id));
    }
    const {childCollection} = props;
    const deleteBtnLabel = 'delete';
    return (
        <>
            { childCollection.map(child => {
                return (
                    <div className={style.child} key={ child.id } >
                        <GrandChild child={ child } render={characters => (
                            <div>{ characters[0] }</div>)} />
                        <button onClick={ () => onDelete(child.id) } >{deleteBtnLabel}</button>
                    </div>
                );
                })
            }
        </>
    );
}
Child.propTypes = {
    childCollection: PropTypes.array.isRequired,
    childDeleted: PropTypes.func.isRequired
};
export default Child;