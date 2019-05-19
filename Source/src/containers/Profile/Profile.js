import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Profile.css';
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
            case "Messages":
                this.props.history.push({pathname: '/messages'});
                break;
            default: ;
        }
        
    }

    render() {
        return (
            <div>
                <div>
                    {this.props.Name}
                </div>
                <section className={classes.Posts}>
                    <Tile 
                        title={'Posts'}
                        clicked={() => this.postSelectedHandler('Posts')}/>                
                    <Tile 
                        title={'New'}
                        clicked={() => this.postSelectedHandler('New')}/>                
                    <Tile 
                        title={'Messages'}
                        clicked={() => this.postSelectedHandler('Messages')}/>                
                </section>
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