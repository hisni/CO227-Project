import React, { Component } from 'react';
import Intro from '../../components/Intro/Intro'
import Districts from '../Districts/Districts';
import classes from './HomePage.css';
import Map from '../../components/VectorMap/Map';

class HomePage extends Component {

    state = {
        current: null,
        hovered: null
    };

    onClick = (e) => {
        const district = e.target.attributes.name.value;
        this.props.history.push({pathname: '/posts/' + district});
    };
    setCurrent = id => this.setState({ current: [id] });
    clearCurrent = () => this.setState({ current: null });
    onMouseEnter = e => this.setState({ hovered: e.target.attributes.name.value });
    onMouseLeave = () => this.setState({ hovered: null });


    render() {

        const { current } = this.state;
        const layerProps = {
            onMouseEnter: this.onMouseEnter,
            onMouseLeave: this.onMouseLeave,
            onClick: this.onClick,
        };

        return (
            <div className={classes.bg}>
                <div className={classes.ints}>
                    <Intro/>
                    
                </div>
                <div className={classes.Map}>
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
                        hover={this.state.hovered}
                    />
                </div>
            </div>
        );
    }
}

export default HomePage
