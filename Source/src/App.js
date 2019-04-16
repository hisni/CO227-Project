import React, { Component } from 'react';
import classes from './App.css';
import Blog from './containers/Blog/Blog';
import HomePage from './components/HomePage/HomePage'

class App extends Component {
  state = {
    district : 'none'
  }

  pageChange = e => {
    this.setState({district: e});
  }
  

  render() {
    return (
        <div className={classes.App}>
          {this.state.district==='none' ? <HomePage pageChange={this.pageChange}/> : (
            console.log(this.state.district),
            <Blog district={this.state.district}/>
          )}
        </div>
    );
  }
}

export default App;
