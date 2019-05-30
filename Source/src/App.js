import React, { Component } from 'react';
// import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './App.css';
import AdminLogin from './containers/Auth/AdminLogin';
import Main from './containers/Main/Main';
import * as actions from './store/actions/index';

import { IconContext } from "react-icons";

class App extends Component {

    // componentDidMount(){
    //     this.props.onTryAutoSignup();
    // }

    render() {

        return (
            <IconContext.Provider value={{ color: "rgb(3, 78, 41)",style: { verticalAlign: 'middle' } , className: "global-class-name" }}>
                <div className={classes.App}>
                    <Switch>
                        <Route path="/admin" exact component={AdminLogin} />
                        <Route path="/" component={Main} />
                    </Switch>
                </div>
            </IconContext.Provider>
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
        onTryAutoSignup: () => dispatch( actions.authCheckState() )
    };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ));
