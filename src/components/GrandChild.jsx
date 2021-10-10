import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types';

function GrandChild({child, onCharacters}){

    const [characters,setCharacters] = useState([]);

    function returnCharacters(){
        onCharacters(characters);
    }
    useEffect(() => {
        setCharacters([...child.identifier]);
    }, [child]);
    return (
        <div className="grandchild">
            <div>{ child.id }</div>
            <div>{ child.identifier }</div>
            { children && children.map(child => {
                  return (<child characters={ returnCharacters } />)
              })
            }
        </div>
    );
}
GrandChild.propTypes = {
    child: PropTypes.shape({
        id: PropTypes.number.isRequired,
        identifier: PropTypes.string.isRequired
    })
};
export default GrandChild;