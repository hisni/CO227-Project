import React, { Component } from 'react';
import { connect } from 'react-redux';

import CreateUser from './CreateUser';
import classes from './AdminProfile.css';
import Button from '../../components/UI/Button/Button'
import Tile from '../../components/UI/Tile/Tile';

class AdminProfile extends Component {

    postSelectedHandler = (id) => {
        switch ( id ) {
            case "PHIUsers":
                this.props.history.push({pathname: '/phiusers'});
                break;
            case "GeneralUsers":
                this.props.history.push({pathname: '/GeneralUsers'});
                break;
            default: ;
        } 
    }

    logoutSelectedHandler = () => this.props.history.push({pathname: '/adminLogout'});

    render() {
        return (
            <div className={classes.Profile}>
                <div className={classes.Title}>
                    <h3>Admin Controls</h3>
                </div>
                <div>
                    <section className={classes.UserManagement}>
                        <div className={classes.Users}>
                            <Tile 
                                title={'PHI Accounts'}
                                clicked={() => this.postSelectedHandler('PHIUsers')}/>                
                            <Tile 
                                title={'General Accounts'}
                                clicked={() => this.postSelectedHandler('GeneralUsers')}/>   
                        </div>
                        <div className={classes.CreateUsers}>
                            <CreateUser />
                        </div>                         
                    </section>
                </div>
                    <div className={classes.Logout}>
                        <Button btnType="Logout" clicked={ () => this.logoutSelectedHandler() }>Logout</Button>
                    </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.adminAuth.adminToken !== null,
        UID: state.adminAuth.adminUserId,
        Name: state.adminAuth.adminUsername
    }
}

export default connect(mapStateToProps)(AdminProfile);