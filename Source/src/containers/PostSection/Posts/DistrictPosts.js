import React, { Component } from 'react';
import axios from 'axios';
//import {Link} from 'react-router-dom';
import Post from '../../../components/Post/Post';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './Posts.css';
import Input from '../../../components/UI/Input/Input';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

class DistrictPosts extends Component {
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
                value: this.props.match.params.district,
                validation: {},
                valid: true
            }
        }
    }

    componentDidMount () {
        const District = this.props.match.params.district;
        axios.get( '/Posts.json?orderBy="District"&equalTo="' + District + '"')
        .then( response => {
            const fetchedPosts = [];
            for(let key in response.data){
                fetchedPosts.push({
                    ...response.data[key],
                    id: key
                });
            }
            console.log(fetchedPosts);
            this.setState({posts: fetchedPosts});
        } );
    }

    postSelectedHandler = (id) => {
        this.props.history.push({pathname: '/posts/' + this.props.match.params.district + '/' + id});
    }

    inputChangedHandler = (event, PostIdentifier) =>{
        const updatedPostForm = {
            ...this.state.Controls,
            [PostIdentifier]: {
                ...this.state.Controls[PostIdentifier],
                value: event.target.value,
                // valid: checkValidity(event.target.value, this.state.PostForm[PostIdentifier].validation),
                touched: true
            }
        };

        this.setState({Controls: updatedPostForm});
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
                            clicked={() => this.postSelectedHandler(post.id)}/>
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
                                clicked={() => this.postSelectedHandler(post.id)}/>
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
                    // label={filterElement.id}
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
                <div className={classes.Left} >
                    District
                    {filter}
                </div>
                <div className={classes.Right} >
                    <section className={classes.Posts}>
                        {posts}
                    </section>
                </div>
            </Aux>
        );
        
    };
}


export default DistrictPosts;