import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import classes from './NewPost.css';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';

class NewPost extends Component {
    state = {
        PostForm: {
            Title: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Title'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            Content: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Content'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            Type: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Type'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            Address: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
        },
        submitted: false,
        formIsValid: false
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        // if (rules.minLength) {
        //     isValid = value.length >= rules.minLength && isValid
        // }

        // if (rules.maxLength) {
        //     isValid = value.length <= rules.maxLength && isValid
        // }

        // if (rules.isEmail) {
        //     const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        //     isValid = pattern.test(value) && isValid
        // }

        // if (rules.isNumeric) {
        //     const pattern = /^\d+$/;
        //     isValid = pattern.test(value) && isValid
        // }

        return isValid;
    }

    inputChangedHandler = (event, PostIdentifier) =>{
        const updatedPostForm = {
            ...this.state.PostForm,
            [PostIdentifier]: {
                ...this.state.PostForm[PostIdentifier],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.PostForm[PostIdentifier].validation),
                touched: true
            }
        };
        this.setState({PostForm: updatedPostForm});
    }

    postDataHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for(let formIdentifier in this.state.PostForm ){
            formData[formIdentifier] = this.state.PostForm[formIdentifier].value;
        }

        const data = {
            UID: "Hisni",
            postData : formData
        };
        
        axios.post('https://co227-project.firebaseio.com/Posts.json',data)
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
        for (let key in this.state.PostForm) {
            formElementsArray.push({
                id: key,
                config: this.state.PostForm[key]
            });
        }
        let form = (
            formElementsArray.map(formElement => (
                <Input 
                    key={formElement.id}
                    label={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)} />
            ))
        );
  
        return (
            <div className={classes.NewPost}>
                {redirect}
                <h1>Add a new Post</h1>
                <form onSubmit={this.postDataHandler} >
                    {form}
                    <Button btnType="Success" >Add Post</Button>
                </form>
            </div>
        );
    }
}

export default NewPost;