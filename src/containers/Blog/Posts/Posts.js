import React, { Component } from 'react';
import axios from 'axios';
import Post from '../../../components/Tile/Post/Post';
import classes from './Posts.css';

class Posts extends Component {
    state = {
        posts: [],
        selectedPostId: null
    }

    componentDidMount () {
        axios.get( '/posts' )
            .then( response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                });
                this.setState({posts: updatedPosts});
            } );
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
    }

    render() {
        
        const posts = this.state.posts.map(post => {
            return <Post 
                key={post.id} 
                title={post.title} 
                author={post.author}
                clicked={() => this.postSelectedHandler(post.id)} />;
        });

        return(
            <section className={classes.Posts}>
                {posts}
            </section>
        );
        
    };
}

export default Posts;