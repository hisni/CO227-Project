import React, { Component } from 'react';
import Intro from '../../components/Intro/Intro'
import Districts from '../Districts/Districts';
import classes from './HomePage.css';
import Map from '../../components/VectorMap/Map';

class HomePage extends Component {

    state = {
        current: null,
    };

    onClick = (e) => {
        const name = e.target.attributes.name.value;
        console.log(name);
        // window.open(`https://www.google.com/search?q=${name}%20nz`);
    };

    setCurrent = id => this.setState({ current: [id] });

    clearCurrent = () => this.setState({ current: null });


    render() {

        const { current } = this.state;
        const layerProps = {
            onClick: this.onClick,
        };

        return (
            <div className={classes.bg}>
                
                <div className={classes.ints}>
                    {/* <Intro/> */}
                    <Map 
                        cr={current}
                        layerProps={layerProps}
                    />
                </div>
                <div className={classes.districts}>
                    <Districts 
                        {...this.props}
                        set={this.setCurrent}
                        clear={this.clearCurrent}
                    />
                </div>
            </div>
        );
    }
}

export default HomePage
