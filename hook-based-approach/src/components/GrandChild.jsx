import React from 'react';
import PropTypes from 'prop-types';
import style from '../style/GrandChild.module.scss';

function GrandChild(props){
    const {child} = props;

    return (
        <div className={style.grandchild}>
            <div>{ child.id }</div>
            <div>{ child.identifier }</div>
            {props.render([...child.identifier])}
        </div>
    );
}
GrandChild.propTypes = {
    child: PropTypes.shape({
        id: PropTypes.number.isRequired,
        identifier: PropTypes.string.isRequired
    }),
    render: PropTypes.func.isRequired
};
export default GrandChild;