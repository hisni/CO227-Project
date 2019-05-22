import React, { Component } from 'react';
import classes from './Districts.css';

class Districts extends Component {

  state = {
    // selectedDistrict: null,
    districts : [
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
    ]
  }

  districtSelectedHandler = (district) => {
    this.props.history.push({pathname: '/posts/' + district});
  }
    
  render() {
    return (
      <div>
        <h3 className={classes.text}> Districts </h3>
        {this.state.districts.map((district)=>{
          return <button 
            key={district[0]} 
            className={classes.districts}  
            onClick={() => this.districtSelectedHandler(district[0])} > {district[0]}  </button>
        })}
      </div>
    )
  }
}

export default Districts;