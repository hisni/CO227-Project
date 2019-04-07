import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import classes from './NewPost.css';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';

class NewPost extends Component {
    state = {
        PostForm:{
            Title: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Title',
                    value: ''
                }
            },
            Content: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Content',
                    value: ''
                }
            },
            Type: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Type',
                    value: ''
                }
            },
            Address: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Address',
                    value: ''
                }
            },
        },
        postData: {
            uid:null,
            title: '',
            content: '',
            author: 'Max',
        },
        submitted:false
    }

    postDataHandler = () => {
        const data = {
            title: this.state.title,
            content: this.state.content,
            author: this.state.author
        };
        
        axios.post('/posts/',data)
            .then( response => {
                this.setState({submitted:true});
                //console.log(this.state);
                //this.props.history.push('/posts');
            });
    }

    render () {
        let redirect = null;
        
        if( this.state.submitted ){
            redirect = <Redirect to="posts"/>
        }

        const formElementsArray = [];
        for ( let key in this.state.PostForm ) {
            formElementsArray.push( {
                id: key,
                config: this.state.PostForm[key]
            } );
        }

        const form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                label={formElement.id}
                // invalid={!formElement.config.valid}
                // shouldValidate={formElement.config.validation}
                // touched={formElement.config.touched}
                // changed={( event ) => this.inputChangedHandler( event, formElement.id )}
                 />
        ) );

        
        return (
            <div className={classes.NewPost}>
                {redirect}
                <h1>Add a new Post</h1>
                <div>
                    {form}
                </div>
                <Button clicked={this.postDataHandler}>Add Post</Button>
            </div>
        );
    }
}

export default NewPost;