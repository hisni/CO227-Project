import React, { Component } from 'react';
import axios from 'axios';

import Spinner from '../../components/UI/Spinner/Spinner';
import Post from '../../components/Post/Post';
import classes from './User.css';

class Profile extends Component {
    state = {
        loadedPost: null,
        posts: null
    }

    componentDidMount () {
        this.loadData();
    }

    loadData () {
        if ( this.props.match.params.pid ) {
            if ( !this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== +this.props.match.params.pid) ) {
                axios.get( '/Posts/' + this.props.match.params.pid + '.json' )
                    .then( response => {
                        this.setState( { loadedPost: response.data } );
                        this.loadUserPosts(this.state.loadedPost.UID);
                    } );
            }
        }
    }

    loadUserPosts(UID){
        if( UID ){
            var queryParams = '/Posts.json?orderBy="UID"&equalTo="' + UID + '"';
            axios.get( queryParams )
            .then( response => {
                const fetchedPosts = [];
                for(let key in response.data){
                    fetchedPosts.push({
                        ...response.data[key],
                        id: key
                    });
                }
                this.setState({posts: fetchedPosts});
            } );
        }
    }

    postSelectedHandler = (id,district) => {
        this.props.history.push({pathname: '/posts/' + district + '/' + id});
    }

    render() {
        let post = <Spinner/>;
        if ( this.state.loadedPost ) {
            post = (
                <div>
                    <h1>{this.state.loadedPost.postData.Title}</h1>
                    <p>{this.state.loadedPost.postData.ContactNo}</p>
                    <p>{this.state.loadedPost.postData.Address}</p>
                </div>
            );
        }

        let posts = null;
        if( this.state.posts ){
            posts = this.state.posts.map(post => {
                return (
                    <Post 
                        key={post.id} 
                        title={post.postData.Title} 
                        type={post.postData.Type}
                        contect={post.postData.ContactNo}
                        address={post.postData.Address}
                        clicked={() => this.postSelectedHandler(post.id,post.District)}/>
                );
            });
        }

        return(
            <div>
                {post}
                <section className={classes.Posts}>
                    {posts}
                </section>
            </div>
        );
    }
}

export default Profile;