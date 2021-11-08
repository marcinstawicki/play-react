import React from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {deleteChildActionCreator} from '../features';
import GrandChild from './GrandChild';
import style from '../style/Child.module.scss';

class Child extends React.Component {

    onDelete(id){
        this.props.childDeleted({ message: 'deleted successfully', id });
        this.props.deleteChildAction(id);
    }
    render(){
        const {childCollection} = this.props;
        const deleteBtnLabel = 'delete';
        return (
            <>
                { childCollection.map(child => {
                        return (
                            <div className={style.child} key={ child.id } >
                                <GrandChild child={ child } render={characters => (
                                    <div>{ characters[0] }</div>)} />
                                <button onClick={ () => this.onDelete(child.id) } >{ deleteBtnLabel }</button>
                            </div>
                        );
                    })
                }
            </>
        );
    }
}
Child.propTypes = {
    childCollection: PropTypes.array.isRequired,
    childDeleted: PropTypes.func.isRequired
};

function mapStateToProps(state){
    return {}
}
function mapDispatchToProps(dispatch){
    return {
        deleteChildAction: (id) => {
            dispatch(deleteChildActionCreator(id));
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Child);