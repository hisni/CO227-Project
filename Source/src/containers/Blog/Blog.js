import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import classes from './Blog.css';
import Layout from '../../hoc/Layout/Layout';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';
import FullPost from './FullPost/FullPost';
import Login from '../Auth/Login';
import Signup from '../Auth/Signup';


class Blog extends Component {
    render () {
        return (
            <div className={classes.Blog}>
                <Layout>
                    <Switch>
                        <Route path="/posts" exact component={Posts} />
                        <Route path="/post-add" component={NewPost} />
                        <Route path="/login" exact component={Login} />                        
                        <Route path="/register" exact component={Signup} />                                                
                        <Route path="/posts/:id" exact component={FullPost} />
                        <Redirect from="/" to="/posts" />
                    </Switch>
                </Layout>
            </div>
        );
    }
}

export default Blog;