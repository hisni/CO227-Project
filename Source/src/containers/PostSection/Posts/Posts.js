import React, { Component } from 'react';
import axios from 'axios';
//import {Link} from 'react-router-dom';
import Post from '../../../components/Post/Post';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './Posts.css';
import Input from '../../../components/UI/Input/Input';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

class Posts extends Component {
    state = {
        posts: null,
        Controls: {
            District: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'all', displayValue: 'All'},
                        {value: 'Matale', displayValue: 'Matale'},
                        {value: 'Kandy', displayValue: 'Kandy'},
                        {value: 'Nuwara Eliya', displayValue: 'Nuwara Eliya'},
                        {value: 'Kurunegala', displayValue: 'Kurunegala'},
                        {value: 'Puttalam', displayValue: 'Puttalam'},
                        {value: 'Colombo', displayValue: 'Colombo'},
                        {value: 'Kaluthara', displayValue: 'Kaluthara'},
                        {value: 'Gampaha', displayValue: 'Gampaha'},
                        {value: 'Badulla', displayValue: 'Badulla'},
                        {value: 'Ampara', displayValue: 'Ampara'},
                        {value: 'Batticaloa', displayValue: 'Batticaloa'},
                        {value: 'Jaffna', displayValue: 'Jaffna'},
                        {value: 'Kegalle', displayValue: 'Kegalle'},
                        {value: 'Mannar', displayValue: 'Mannar'},
                        {value: 'Monaragala', displayValue: 'Monaragala'},
                        {value: 'Mullaitivu', displayValue: 'Mullaitivu'},
                        {value: 'Trincomalee', displayValue: 'Trincomalee'},
                        {value: 'Vavuniya', displayValue: 'Vavuniya'},
                        {value: 'Galle', displayValue: 'Galle'},
                        {value: 'Matara', displayValue: 'Matara'},
                        {value: 'Hambantota', displayValue: 'Hambantota'},
                    ]
                },
                value: 'all',
                validation: {},
                valid: true
            }
        }
    }

    componentDidMount () {
        if( this.props.match.params.district ){
            this.stateDistrictHandler( this.props.match.params.district );
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

    stateDistrictHandler = ( initDistrict ) => {
        const updatedControls = {
            ...this.state.Controls,
            District: {
                ...this.state.Controls.District,
                value: initDistrict,
                touched: true
            }
        };
        this.setState({Controls: updatedControls});
    }

    postSelectedHandler = (id,district) => {
        this.props.history.push({pathname: '/posts/' + district + '/' + id});
    }

    inputChangedHandler = (event, PostIdentifier) =>{
        const updatedControls = {
            ...this.state.Controls,
            [PostIdentifier]: {
                ...this.state.Controls[PostIdentifier],
                value: event.target.value,
                touched: true
            }
        };

        this.setState({Controls: updatedControls});
    }

    render() {
        
        let posts = <Spinner />;
        
        if( this.state.posts ){
            posts = this.state.posts.map(post => {
                if( this.state.Controls.District.value === 'all' ){
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
                <div className={classes.bg}>
                    <div className={classes.Left} >
                        {/* <h3>District</h3> */}
                        {filter}
                    </div>
                    <div className={classes.Right} >
                        <section className={classes.Posts}>
                            {posts}
                        </section>
                    </div>
                </div>
            </Aux>
            
        );
        
    };
}

export default Posts;