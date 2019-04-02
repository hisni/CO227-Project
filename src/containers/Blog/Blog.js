import React, { Component } from 'react';
import { Route } from 'react-router-dom';
//import classes from './Blog.css';
import Layout from '../../hoc/Layout/Layout';
import Posts from './Posts/Posts';
import NewPosts from './NewPost/NewPost';

class Blog extends Component {
    render () {
        return (
            <div>
                <Layout>
                    <Route path="/" exact component={Posts} />
                    <Route path="/post-add" component={NewPosts} />
                </Layout>
            </div>
        );
    }
}

export default Blog;