import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

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
            Discription: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Discription'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            ContactNo: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Contact Number'
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
        formIsValid: false,
        postID: null
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

        let formIsValid = true;
        for (let inputIdentifier in updatedPostForm) {
            formIsValid = updatedPostForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({PostForm: updatedPostForm, formIsValid: formIsValid});
    }

    postDataHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for(let formIdentifier in this.state.PostForm ){
            formData[formIdentifier] = this.state.PostForm[formIdentifier].value;
        }

        const token = this.props.tokenID;
        const ID = this.props.userID

        const data = {
            UID: ID,
            postData : formData
        };
        
        axios.post('/Posts.json?auth=' + token ,data)
            .then( response => {                
                this.setState({submitted:true, postID:response.data.name});
            });

    }


    render () {
        let redirect = null;
        
        if( this.state.submitted ){
            redirect = <Redirect to={"posts/user/" + this.state.postID}/>
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
                    <Button btnType="Success" disabled={!this.state.formIsValid} >Add Post</Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        tokenID: state.auth.token,
        userID: state.auth.userId
    }
}

export default connect(mapStateToProps)(NewPost);