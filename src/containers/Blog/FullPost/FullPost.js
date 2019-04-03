import React, { Component } from 'react';
import axios from 'axios';
import classes from './FullPost.css';
import Spinner from '../../../components/UI/Spinner/Spinner'

class FullPost extends Component {
    state = {
        loadedPost: null
    }

    componentDidMount () {
        if ( this.props.match.params.id ) {
            if ( !this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id) ) {
                axios.get( '/posts/' + this.props.match.params.id )
                    .then( response => {
                        this.setState( { loadedPost: response.data } );
                    } );
            }
        }
    }

    deletePostHandler = () => {
        axios.delete( 'https://jsonplaceholder.typicode.com/posts/' + this.props.id )
            .then( response => {
                console.log(response);
            });
    }

    render () {
        let post = <Spinner/>;
        if ( this.props.id ) {
            post = <p style={{ textAlign: 'center' }}>Loading...!</p>;
        }
        if ( this.state.loadedPost ) {
            post = (
                <div className={classes.FullPost}>
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className={classes.Edit}>
                        <button onClick={this.deletePostHandler} className={classes.Delete}>Delete</button>
                    </div>
                </div>
            );
        }
        return post;
    }
}

export default FullPost;