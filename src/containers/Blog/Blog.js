import React, { Component } from 'react';
import { Route } from 'react-router-dom';
//import classes from './Blog.css';
import Layout from '../../hoc/Layout/Layout';
import Posts from './Posts/Posts';
import NewPosts from './NewPost/NewPost';
import FullPost from './FullPost/FullPost'

class Blog extends Component {
    render () {
        return (
            <div>
                <Layout>
                    <Route path="/" exact component={Posts} />
                    <Route path="/post-add" component={NewPosts} />
                    <Route path="/:id" exact component={FullPost} />
                </Layout>
            </div>
        );
    }
}

export default Blog;