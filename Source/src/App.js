import React, { Component } from 'react';
import classes from './App.css';
import Blog from './containers/Blog/Blog';
import HomePage from './components/HomePage/HomePage'
//import Blog from './containers/Blog/Blog';

class App extends Component {
  state = {
    value : 'homepage'
  }

  pageChange = e => {
    this.setState({value: e});
  }
  

  render() {
    return (
        <div className={classes.App}>
          {this.state.value==='homepage' ? <HomePage pageChange={this.pageChange}/> : <Blog dist={this.state.value}/>}
        </div>
    );
  }
}

export default App;
