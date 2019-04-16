import React, { Component } from 'react';
import Intro from '../../components/Intro/Intro'
import Districts from '../Districts/Districts';
import classes from './HomePage.css'

class HomePage extends Component {
    render() {
        return (
            <div className={classes.bg}>
                <div className={classes.ints}>
                    <Intro/>
                </div>
                <div className={classes.districts}>
                    <Districts {...this.props}/>
                </div>
            </div>
        );
    }
}

export default HomePage
