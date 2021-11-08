import React from 'react';
import {withRouter} from "react-router-dom";
import Parent from '../components/Parent';
import style from '../style/Page01.module.scss';
import PropTypes from "prop-types";

class Page01 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reasonMessage: ''
        };
        this.timeOut = null;
    }
    onReason(){
        if(typeof this.props.location.state !== 'undefined'){
            this.timeOut = window.setTimeout(() =>{
                this.setState({reasonMessage: ''});
            },3000);
            this.setState({reasonMessage: this.props.location.state.reason});
        } else {
            this.setState({reasonMessage: ''});
        }
    }
    componentDidMount() {
        this.onReason();
    }
    componentWillUnmount() {
        window.clearTimeout(this.timeOut);
    }
    render(){
        return(
            <div id={style["page01"]}>
                {this.state.reasonMessage && (<div id={style["msg"]}>{ this.state.reasonMessage }</div>)}
                <Parent />
            </div>
        );
    }
}
Page01.propTypes = {
    location: PropTypes.object.isRequired
};
export default withRouter(Page01);
