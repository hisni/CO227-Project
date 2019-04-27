import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import Post from '../../../components/Post/Post';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './Posts.css';

class UserPosts extends Component {
    state = {
        posts: null,
    }

    componentDidMount () {
        
        var queryParams = null;

        if( this.props.isAuthenticated ){
            queryParams = '/Posts.json?orderBy="UID"&equalTo="' + this.props.UID + '"';
        }

        axios.get( queryParams )
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
        this.props.history.push({pathname: '/user/posts/' + id});
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

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        UID: state.auth.userId
    }
}

export default connect(mapStateToProps)(UserPosts);