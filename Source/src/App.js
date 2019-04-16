import React, { Component } from 'react';
import classes from './App.css';
import Blog from './containers/Blog/Blog';
//import HomePage from './components/HomePage/HomePage'

class App extends Component {

  render() {
    return (
        <div className={classes.App}>
          {/* {this.state.district==='none' ? <HomePage pageChange={this.pageChange}/> : (
            console.log(this.state.district),
            <Blog district={this.state.district}/>
          )} */}
          <Blog/>
        </div>
    );
  }
}

export default App;
