import React, { Component } from 'react';
import axios from 'axios';
//import {Link} from 'react-router-dom';
import Post from '../../../components/Post/Post';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './Posts.css';

class Posts extends Component {
    state = {
        posts: null
    }

    componentDidMount () {
        axios.get( '/Posts.json' )
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

    postSelectedHandler = (id) => {
        this.props.history.push({pathname: '/posts/all/' + id});
    }

    render() {
        
        let posts = <Spinner />;
        
        if( this.state.posts ){
            posts = this.state.posts.map(post => {
                return (
                    <Post 
                        key={post.id} 
                        title={post.postData.Title} 
                        type={post.postData.Type}
                        contect={post.postData.ContactNo}
                        address={post.postData.Address}
                        clicked={() => this.postSelectedHandler(post.id)}/>
                );
            });
        }

        return(
            <section className={classes.Posts}>
                {posts}
            </section>
        );
        
    };
}

export default Posts;