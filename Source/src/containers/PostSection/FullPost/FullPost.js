import React, { Component } from 'react';
import axios from 'axios';
import classes from './FullPost.css';
import Spinner from '../../../components/UI/Spinner/Spinner'

class FullPost extends Component {
    state = {
        loadedPost: null
    }

    componentDidMount () {
        this.loadData();
    }

    loadData () {
        if ( this.props.match.params.id ) {
            if ( !this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== +this.props.match.params.id) ) {
                axios.get( '/Posts/' + this.props.match.params.id + '.json' )
                    .then( response => {
                        console.log(response);
                        this.setState( { loadedPost: response.data } );
                    } );
            }
        }
    }

    // deletePostHandler = () => {
    //     axios.delete( 'https://jsonplaceholder.typicode.com/posts/' + this.props.match.params.id )
    //         .then( response => {
    //             console.log(response);
    //         });
    // }

    render () {
        let post = <Spinner/>;
        if ( this.state.loadedPost ) {
            post = (
                <div className={classes.FullPost}>
                    <h1>{this.state.loadedPost.postData.Title}</h1>
                    <p>{this.state.loadedPost.postData.Discription}</p>
                    <p>{this.state.loadedPost.postData.ContactNo}</p>
                    <p>{this.state.loadedPost.postData.Address}</p>
                </div>
            );
        }
        return post;
    }
}

export default FullPost;