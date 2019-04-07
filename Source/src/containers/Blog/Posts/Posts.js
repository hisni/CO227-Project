import React, { Component } from 'react';
import axios from 'axios';
//import {Link} from 'react-router-dom';
import Post from '../../../components/Tile/Post/Post';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './Posts.css';

class Posts extends Component {
    state = {
        posts: null,
        //selectedPostId: null
    }

    componentDidMount () {
        axios.get( 'https://co227-project.firebaseio.com/Posts.json' )
            .then( response => {
                const fetchedPosts = [];
                for(let key in response.data){
                    fetchedPosts.push({
                        ...response.data[key],
                        id: key
                    });
                }
                console.log(fetchedPosts);
                this.setState({posts: fetchedPosts});
            } );
    }

    postSelectedHandler = (id) => {
        //this.setState({selectedPostId: id});
        this.props.history.push({pathname: '/posts/' + id});
    }

    render() {
        
        let posts = <Spinner />;
        
        if( this.state.posts ){
            posts = this.state.posts.map(post => {
                return (
                    // <Link to={'/'+post.id} >
                        <Post 
                            key={post.id} 
                            title={post.postData.Title} 
                            content={post.postData.Content}
                            address={post.postData.Address}
                            clicked={() => this.postSelectedHandler(post.id)}/>
                    // </Link>
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