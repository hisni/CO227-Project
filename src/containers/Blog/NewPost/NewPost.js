import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import classes from './NewPost.css';
import Button from '../../../components/UI/Button/Button';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max',
        submitted:false
    }

    postDataHandler = () => {
        const data = {
            title: this.state.title,
            content: this.state.content,
            author: this.state.author
        }
        axios.post('/posts/',data)
            .then( response => {
                // console.log(response);
                this.setState({submitted:true});
                //this.props.history.push('/posts');
            });
    }

    render () {
        let redirect = null;
        
        if( this.state.submitted ){
            redirect = <Redirect to="posts"/>
        }
        
        return (
            <div className={classes.NewPost}>
                {redirect}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Aslam</option>
                    <option value="Manu">Hisni</option>
                </select>
                <Button onClick={this.postDataHandler}>Add Post</Button>
            </div>
        );
    }
}

export default NewPost;