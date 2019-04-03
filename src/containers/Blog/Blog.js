import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
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
                    <Switch>
                        <Route path="/posts" exact component={Posts} />
                        <Route path="/post-add" component={NewPosts} />
                        <Route path="/posts/:id" exact component={FullPost} />
                        <Redirect from="/" to="/posts" />
                    </Switch>
                </Layout>
            </div>
        );
    }
}

export default Blog;