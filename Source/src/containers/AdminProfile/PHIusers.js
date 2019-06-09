import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../../components/Post/Post';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './Posts.css';
import Input from '../../../components/UI/Input/Input';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

class Posts extends Component {
    state = {
        posts: null,

    }

    componentDidMount () {
        if( this.props.match.params.district ){
            this.setDistrictHandler( this.props.match.params.district );
        }
        
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

    render() {
        
        if( this.state.posts ){
            posts = this.state.posts.map(post => {
                if( this.state.Controls.District.value === 'all' ){
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
                    if( post.District === this.state.Controls.District.value ){
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
                }
            });
        }

        const filterArray = [];
        for (let key in this.state.Controls) {
            filterArray.push({
                id: key,
                config: this.state.Controls[key]
            });
        }

        let filter = (
            filterArray.map(filterElement => (
                <Input 
                    key={filterElement.id}
                    label={filterElement.id}
                    class={"Clear"}
                    elementType={filterElement.config.elementType}
                    elementConfig={filterElement.config.elementConfig}
                    value={filterElement.config.value}
                    invalid={!filterElement.config.valid}
                    shouldValidate={filterElement.config.validation}
                    touched={filterElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event, filterElement.id)} />
            ))
        );

        return(
            <Aux>
                
            </Aux>
            
        );
        
    };
}

export default Posts;