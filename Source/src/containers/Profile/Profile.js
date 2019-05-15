import React, { Component } from 'react';
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
            case "Contact":
                this.props.history.push({pathname: '/contact'});
                break;
            default: ;
        }
        
    }

    render() {
        return (
            <section className={classes.Posts}>
                <Tile 
                    title={'Posts'}
                    clicked={() => this.postSelectedHandler('Posts')}/>                
                <Tile 
                    title={'New'}
                    clicked={() => this.postSelectedHandler('New')}/>                
                <Tile 
                    title={'Contact'}
                    clicked={() => this.postSelectedHandler('Contact')}/>                

            </section>
        );
    }
}

export default Profile;