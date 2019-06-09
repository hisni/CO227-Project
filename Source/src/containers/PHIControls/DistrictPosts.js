import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import Spinner from '../../components/UI/Spinner/Spinner';
import Post from '../../components/Post/Post';
import classes from './DistrictPosts.css';

class Accounts extends Component {
    state = {
        posts: null,
    }

    componentDidMount () {
        axios.get( '/Posts.json' )
        .then( response => {
            const fetchedPosts = [];
            for(let key in response.data){
                fetchedPosts.push({
                    ...response.data[key],
                    id: key
                });
            }
            this.setState({posts: fetchedPosts});
        } );
    }

    postSelectedHandler = (id,district) => {
        this.props.history.push({pathname: '/posts/' + district + '/' + id});
    }

    render() {
        
        let posts = <Spinner />;
        let count = this.state.Count;
        
        if( this.state.posts ){
            posts = this.state.posts.map(post => {
                if( post.District === this.props.district ){
                    count = count+1;                        
                    return (
                        <Post 
                            key={post.id} 
                            title={post.postData.Title} 
                            type={post.postData.Type}
                            contect={post.postData.ContactNo}
                            address={post.postData.Address}
                            clicked={() => this.postSelectedHandler(post.id,post.District)}/>
                    );
                }
                else{
                    return null;
                }
            });

            if( count === 0){
                posts = <h3 style={{color: "rgb(2, 61, 32)"}}>No Posts Found</h3>
            }
        }

        return(
            <div className={classes.Accounts}>
                <div className={classes.Title}>
                    <h3>Distict Posts</h3>
                </div>
                <div className={classes.Posts}>
                    {posts}
                </div>
            </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        district: state.auth.District
    }
}

export default connect(mapStateToProps)(Accounts);