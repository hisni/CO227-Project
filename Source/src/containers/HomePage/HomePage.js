import React, { Component } from 'react';
import Intro from '../../components/Intro/Intro'
import Districts from '../Districts/Districts';
import classes from './HomePage.css';
import Map from '../VectorMap/Map';

class HomePage extends Component {

    state = {
        current: null,
        hovered: null,
        isTooltipVisible: false,
        tooltipY: 0,
        tooltipX: 0,
    };

    onClick = (e) => {
        const district = e.target.attributes.name.value;
        this.props.history.push({pathname: '/posts/' + district});
    };
    setCurrent = id => this.setState({ current: [id] });
    clearCurrent = () => this.setState({ current: null });
    onMouseEnter = e => this.setState({ hovered: e.target.attributes.name.value });
    onMouseLeave = () => this.setState({ hovered: null });
    onMouseOver = e => this.setState({ current: e.target.attributes.name.value });
    onMouseMove = e =>
        this.setState({
            isTooltipVisible: true,
            tooltipY: e.clientY + 10,
            tooltipX: e.clientX + 10,
    });
    onMouseOut = () => this.setState({ current: null, isTooltipVisible: false });


    render() {

        const { current } = this.state;
        const layerProps = {
            onMouseEnter: this.onMouseEnter,
            onMouseLeave: this.onMouseLeave,
            onClick: this.onClick,
            onMouseOver: this.onMouseOver,
            onMouseMove: this.onMouseMove,
            onMouseOut: this.onMouseOut,
        };
        const tooltipStyle = {
            display: this.state.isTooltipVisible ? 'block' : 'none',
            top: this.state.tooltipY,
            left: this.state.tooltipX,
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
                        style={tooltipStyle}
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