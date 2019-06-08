import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Profile.css';
import Tile from '../../components/UI/Tile/Tile';

class Profile extends Component {

    postSelectedHandler = (id) => {
        switch ( id ) {
            case "PHIUsers":
                this.props.history.push({pathname: '/accounts'});
                break;
            case "CreateUser":
                this.props.history.push({pathname: '/createuser'});
                break;
            default: ;
        }
        
    }

    render() {
        return (
            <div className={classes.Profile}>
                <div className={classes.Title}>
                    <h3>Admin Profile</h3>
                </div>
                <div>
                    <section className={classes.Posts}>
                        <Tile 
                            title={'PHI Accounts'}
                            clicked={() => this.postSelectedHandler('PHIUsers')}/>                
                        <Tile 
                            title={'CreateUser'}
                            clicked={() => this.postSelectedHandler('CreateUser')}/>                               
                    </section>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        UID: state.auth.userId,
        Name: state.auth.username
    }
}


export default connect(mapStateToProps)(Profile);