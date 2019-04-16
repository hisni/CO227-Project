import React, { Component } from 'react';
import classes from './Districts.css';
import Layout from '../../hoc/Layout/Layout';

class Districts extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
        pageChange : this.props.pageChange,
        dist : [
          ['Matale', 'Dambulla', 'Galewela', 'Naula'],
          ['Kandy', 'Katugastota'],
          ['Nuwara Eliya'],
          ['Kurunegala'],
          ['Puttalam'],
          ['Colombo'],
          ['Kaluthara'],
          ['Gampaha'],
          ['Badulla'],
          ['Ampara'],
          ['Batticaloa'],
          ['Jaffna'],
          ['Kegalle'],
          ['Mannar'],
          ['Monaragala'],
          ['Mullaitivu'],
          ['Trincomalee'],
          ['Vavuniya'],
          ['Galle'],
          ['Matara'],
          ['Hambantota'],
        ],
        dis : ''
      }
    }
    
  render() {

    return (
      <Layout>
          <div>
            <h3> Districts </h3>
            {this.state.dist.map((p)=>{
              return <button className={classes.dist} onClick={()=>this.props.pageChange(p[0])}> {p[0]}  </button>
            })}
          </div>
      </Layout>
    )
  }
}

export default Districts
