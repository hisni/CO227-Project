import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import Table from '../../components/UI/Table/Table';
import classes from './PHIusers.css';

class GeneralUsers extends Component {
    state = {
        posts: null,
    }

    componentDidMount () {
        axios.get( '/Users.json?auth=' + this.props.token )
        .then( response => {
            const fetchedPosts = [];
            for(let key in response.data){
                for(let keyid in response.data[key] ){
                    fetchedPosts.push({
                        ...response.data[key][keyid],
                        id: keyid
                    });
                }
            }
            this.setState({posts: fetchedPosts});
        } );
    }

    render() {
        
        var posts = null;
        if( this.state.posts ){
            posts = this.state.posts.map(post => {
                if( !post.Authority ){
                    return (
                        <Table 
                            key={post.id} 
                            email={post.Email}
                            name={post.Username}
                            district={post.Username}
                        />
                    );
                }else{
                    return null;
                }
            });
        };

        return(
            <div className={classes.Accounts}>
                <div className={classes.Title}>
                    <h3>General Accounts</h3>
                </div>
                <div>
                    {posts}
                </div>
            </div>
        );
        
    };
}

const mapStateToProps = state => {
    return {
        token: state.adminAuth.adminToken
    }
}

export default connect(mapStateToProps)(GeneralUsers);