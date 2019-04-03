import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
//import classes from './Blog.css';
import Layout from '../../hoc/Layout/Layout';
import Posts from './Posts/Posts';
import NewPosts from './NewPost/NewPost';
//import FullPost from './FullPost/FullPost'

class Blog extends Component {
    render () {
        return (
            <div>
                <Layout>
                    <Switch>
                        <Route path="/post-add" component={NewPosts} />
                        <Route path="/" component={Posts} />
                    </Switch>
                </Layout>
            </div>
        );
    }
}

export default Blog;