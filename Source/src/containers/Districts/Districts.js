import React, { Component } from 'react';
import classes from './Districts.css';

class Districts extends Component {

  state = {
    districts : [
        ['Colombo', 'lk-11'],
        ['Gampaha', 'lk-12'],
        ['Kaluthara', 'lk-13'],
        ['Kandy', 'lk-21'],
        ['Matale', 'lk-22'],
        ['Nuwara Eliya', 'lk-23'],        
        ['Galle', 'lk-31'],
        ['Matara', 'lk-32'],
        ['Hambantota', 'lk-33'],
        ['Jaffna', 'lk-41'],
        ['Kilinochchi', 'lk-42'],
        ['Mannar', 'lk-43'],
        ['Vavuniya', 'lk-44'],
        ['Mullaitivu', 'lk-45'],
        ['Batticalo', 'lk-51'],
        ['Ampara', 'lk-52'],
        ['Trincomalee', 'lk-53'],
        ['Kurunegala', 'lk-61'],
        ['Puttalam', 'lk-62'],
        ['Anuradhapura', 'lk-71'],
        ['Polonnaruwa', 'lk-72'],
        ['Badulla', 'lk-81'],
        ['Monaragala', 'lk-82'],
        ['Ratnapura', 'lk-91'],
        ['Kegalle', 'lk-92'],
    ],
    selected: null
  }

  districtSelectedHandler = (district) => {
    this.props.history.push({pathname: '/posts/' + district});
  }
    
  render() {

    return (
      <div className={classes.DistSection} >
        <h2 className={classes.text}> Districts </h2>
        
        {this.state.districts.map((district)=>{

            let buttonClass = classes.districts
            if( this.props.hover === district[0] ){
                buttonClass = classes.districtsHover;
            }
            
          return <button 
            key={district[0]} 
            className={buttonClass}
            onMouseEnter={() => this.props.set(district[1])}
            onMouseLeave={() => this.props.clear()}
            onClick={() => this.districtSelectedHandler(district[0])} > {district[0]}  </button>
        })}

      </div>
    )
  }
}

export default Districts;