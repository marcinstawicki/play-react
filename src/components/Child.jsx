import React, {useState} from 'react'
import {useDispatch} from "react-redux";
import PropTypes from 'prop-types';
import {deleteChildActionCreator} from "../features";
import GrandChild from "./GrandChild";

function Child({childCollection,childDeleted}){
    const dispatch = useDispatch();
    /**
     * it can be done this way as well
     * const childCollection = useSelector(childCollectionSelector);
     */
    const [characters, setCharacters] = useState([]);
    /**
     * immutables
     */
    const deleteBtnLabel = 'delete';
    /**
     * local functions
     */
    function onDelete(id){
        childDeleted({ message: 'deleted successfully', id });
        dispatch(deleteChildActionCreator(id));
    }
    function onCharacters(characters){
        setCharacters(characters);
    }
    return (
        <>
            {
                childCollection.map(child => {
                    return (
                        <div className="child" key={ child.id } >
                            <GrandChild child={ child } >
                                <div onCharacters={ onCharacters } >{ characters[0] }</div>
                            </GrandChild>
                            <button onClick={ () => onDelete(child.id) } >{ deleteBtnLabel }</button>
                        </div>
                    )
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