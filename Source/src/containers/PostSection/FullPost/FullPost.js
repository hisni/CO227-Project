import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './FullPost.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Modal from '../../../components/UI/Modal/Modal';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../../components/UI/Button/Button';
import { FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

class FullPost extends Component {
    state = {
        loadedPost: null,
        delete: false,
        deleteSuccess:false
    }

    componentDidMount () {
        this.loadData();
    }

    loadData () {
        if ( this.props.match.params.id ) {
            if ( !this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== +this.props.match.params.id) ) {
                axios.get( '/Posts/' + this.props.match.params.id + '.json' )
                    .then( response => {
                        this.setState( { loadedPost: response.data } );
                    } );
            }
        }
    }

    deletePostHandler = () => {
        this.setState( { delete: true } );
    }

    deleteCancelHandler = () => {
        this.setState( { delete: false } );
    }

    deleteConfirmHandler = () => {
        const token = this.props.tokenID;
        axios.delete( '/Posts/' + this.props.match.params.id + '.json?auth=' + token )
            .then( response => {
                this.setState( { deleteSuccess: true } );
            });
    }

    postSelectedHandler = () =>{
        this.props.history.push({pathname: '/post/user/'+ this.props.match.params.id});
    }

    render () {
        let post = <Spinner/>;

        if ( this.state.loadedPost ) {
            let linkUser = (
                <h1 onClick={() => this.postSelectedHandler()}>{this.state.loadedPost.postData.Title}</h1>
            ) 
            let deleteButton = null;

            if( this.props.isAuthenticated && this.props.UID === this.state.loadedPost.UID ){
                linkUser = (
                    <div className={classes.Clear}>
                        <h1>{this.state.loadedPost.postData.Title}</h1>
                    </div>    
                )
            }
            console.log(this.props.isAuthorized);

            if( this.props.isAuthorized || (this.props.isAuthenticated && this.props.UID === this.state.loadedPost.UID) ){
                deleteButton = (
                    <Button btnType={"DangerRe"} clicked={this.deletePostHandler} >Delete</Button>
                )
            }

            post = (
                <div className={classes.FullPost}>
                    {linkUser}
                    <p>{this.state.loadedPost.postData.Description}</p>
                    <p><FaPhone/> {this.state.loadedPost.postData.ContactNo}</p>
                    <p><FaMapMarkerAlt/> {this.state.loadedPost.postData.Address}</p>
                    {deleteButton}
                </div>
            );
        }

        let authRedirect = null;
        if (this.state.deleteSuccess) {
            authRedirect = <Redirect to={'/user/posts'}/>
        }
        
        return(
            <Aux >
                <div className={classes.Page}>
                    {authRedirect}
                    <Modal show={this.state.delete} modalClosed={this.deleteCancelHandler}>
                        <p>Are you sure you want to delete this post?</p>
                        <Button btnType={"Danger"} clicked={this.deleteConfirmHandler} >Delete</Button>
                        <Button btnType={"Success"} clicked={this.deleteCancelHandler} >Cancel</Button>
                    </Modal>
                    {post}
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        tokenID: state.auth.token,
        UID: state.auth.userId,
        isAuthorized: state.auth.Authority === "PHI"
    }
}

export default connect(mapStateToProps)(FullPost);