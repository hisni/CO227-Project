import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Profile.css';
import UserPosts from '../PostSection/Posts/UserPosts';
import Tile from '../../components/UI/Tile/Tile';

class Profile extends Component {

    postSelectedHandler = (id) => {
        switch ( id ) {
            case "Posts":
                this.props.history.push({pathname: '/user/posts'});
                break;
            case "New":
                this.props.history.push({pathname: '/post-add'});
                break;
            default: ;
        }
        
    }

    render() {
        return (
            <div className={classes.Profile}>
                <div className={classes.Title}>
                    <h3>@{this.props.Name} Profile</h3>
                </div>
                <div>
                    <section className={classes.ProfileMangement}>
                        <div className={classes.Controls}>
                            {/* <Tile 
                                title={'Posts'}
                                clicked={() => this.postSelectedHandler('Posts')}/>                 */}
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