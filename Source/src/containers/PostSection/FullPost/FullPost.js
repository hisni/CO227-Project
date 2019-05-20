import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import classes from './FullPost.css';
import Spinner from '../../../components/UI/Spinner/Spinner';

class FullPost extends Component {
    state = {
        loadedPost: null,
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
        // axios.delete( 'https://jsonplaceholder.typicode.com/posts/' + this.props.match.params.id )
        //     .then( response => {
        //         console.log(response);
        //     });
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

            if( this.props.isAuthenticated ){
                linkUser = (
                    <div className={classes.Clear}>
                        <h1>{this.state.loadedPost.postData.Title}</h1>
                    </div>    
                )
            }

            let deleteButton = null;
            if( this.props.isAuthenticated && this.props.UID === this.state.loadedPost.UID ){
                deleteButton = (
                    <div className={classes.Delete}>
                        <h3 onClick={() => this.postSelectedHandler()}>Delete</h3>
                    </div> 
                )
            }

            post = (
                <div className={classes.FullPost}>
                    {linkUser}
                    <p>{this.state.loadedPost.postData.Discription}</p>
                    <p>{this.state.loadedPost.postData.ContactNo}</p>
                    <p>{this.state.loadedPost.postData.Address}</p>
                    {deleteButton}
                </div>
            );
        }
        
        return post;
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        UID: state.auth.userId
    }
}

export default connect(mapStateToProps)(FullPost);