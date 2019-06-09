import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './Main.css';
import Layout from '../../hoc/Layout/Layout';
import Posts from '../../containers/PostSection/Posts/Posts';
import NewPost from '../../containers/PostSection/NewPost/NewPost';
import FullPost from '../../containers/PostSection/FullPost/FullPost';
import Login from '../../containers/Auth/Login';
import Signup from '../../containers/Auth/Signup';
import HomePage from '../../containers/HomePage/HomePage';
import Logout from '../../containers/Auth/Logout';
import UserPosts from '../../containers/PostSection/Posts/UserPosts';
import Profile from '../../containers/Profile/Profile';
import User from '../../containers/Profile/User';
import * as actions from '../../store/actions/index';

class Main extends Component {

    componentDidMount(){
        // this.props.onTryAutoSignup();
    }

    render() {

        let routes = (
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/login" exact component={Login} />                        
                <Route path="/register" exact component={Signup} />                                                
                <Route path="/posts/:district" exact component={Posts} />                        
                <Route path="/post/user/:pid" exact component={User} />                                              */}
                <Route path="/posts/:district/:id" exact component={FullPost} />
                <Redirect to="/" />
            </Switch>
        );
      
        if ( this.props.isAuthenticated ) {
            routes = (
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/login" exact component={Login} />                                            
                    <Route path="/post-add" exact component={NewPost} />
                    <Route path="/profile" exact component={Profile} />                    
                    <Route path="/logout" exact component={Logout} />                 
                    <Route path="/user/posts" exact component={UserPosts} />      
                    <Route path="/posts/:district" exact component={Posts} />                        
                    <Route path="/post/user/:pid" exact component={User} />
                    <Route path="/user/posts/:id" exact component={FullPost} />                                                 */}
                    <Route path="/posts/:district/:id" exact component={FullPost} />   
                    <Redirect to="/" />
                </Switch>
            );
        }

        return (
            <div className={classes.App}>
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch( actions.authCheckState() ),
        onTryAutoAdminSignup: () => dispatch( actions.adminAuthCheckState() )
    };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( Main ));