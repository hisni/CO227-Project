import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Profile.css';
import UserPosts from '../PostSection/Posts/UserPosts';
import Tile from '../../components/UI/Tile/Tile';
import AUX from '../../hoc/Auxiliary/Auxiliary';

class Profile extends Component {

    postSelectedHandler = (id) => {
        switch ( id ) {
            case "Posts":
                this.props.history.push({pathname: '/user/posts'});
                break;
            case "New":
                this.props.history.push({pathname: '/post-add'});
                break;
            case "DA":
                this.props.history.push({pathname: '/accounts'});
                break;
            case "DP":
                this.props.history.push({pathname: '/districtposts'});
                break;
            default: ;
        }
    }

    render() {
        var profile = (
            <div className={classes.Profile}>
                <div className={classes.Title}>
                    <h1>@{this.props.Name} Profile</h1>
                </div>
                <div>
                    <section className={classes.ProfileMangement}>
                        <div className={classes.Controls}>
                            <Tile 
                                title={'Add New'}
                                clicked={() => this.postSelectedHandler('New')}/> 
                        </div>
                        <div className={classes.Posts}>
                            <UserPosts {...this.props}/>
                        </div>
                    </section>
                </div>
            </div>
        );

        if( this.props.Authority === "PHI"  ){
            profile = (
                <div className={classes.Profile}>
                    <div className={classes.Title}>
                        <h2>{this.props.Name}</h2>
                        <h3>Public Health Inspector</h3>
                        <h3>{this.props.District} District</h3>
                    </div>
                    <div className={classes.Tiles}>
                        <Tile 
                            title={'District Accounts'}
                            clicked={() => this.postSelectedHandler('DA')}/>
                        <Tile 
                            title={'District Posts'}
                            clicked={() => this.postSelectedHandler('DP')}/> 
                    </div>
                </div>
            )
        }
     
        return (
            <AUX>
                {profile}
            </AUX>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        UID: state.auth.userId,
        Name: state.auth.username,
        Authority: state.auth.Authority,
        District: state.auth.District
    }
}

export default connect(mapStateToProps)(Profile);