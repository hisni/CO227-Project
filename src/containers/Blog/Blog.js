import React, { Component } from 'react';
import { Route } from 'react-router-dom';
//import classes from './Blog.css';
import Posts from './Posts/Posts';
import Layout from '../../hoc/Layout/Layout';


class Blog extends Component {
    render () {
        return (
            <div>
                <Layout>
                    <Route path="/" exact render={ () => <h1>Home</h1>} />
                </Layout>
            </div>
        );
    }
}

export default Blog;