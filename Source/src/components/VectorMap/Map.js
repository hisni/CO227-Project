import React, { Component } from 'react';
import VectorMap from '@south-paw/react-vector-maps';
import SL from '@south-paw/react-vector-maps/maps/json/sri-lanka';
import styled from 'styled-components';
import { Wrapper, Output, MapWrapper } from './styled';
// import classes from './Map.css';

const StyledMap = styled(MapWrapper)`
  svg {
    path{
      fill: #07A749;
      cursor: pointer;
      &:hover {
        fill: #023A19;
      }
      &[aria-current='true'] {
        fill: #023A19;
      }
    }
  }
`;

class Map extends Component {

    render() {
        
        // const { current } = this.state;
        // const layerProps = {
        //     onClick: this.onClick,
        //   };

        return(
        //     <Wrapper style={{ flexFlow: 'nowrap column' }}>
        // <Output>
        //   <p>
        //     <strong>Hover on a list item to highlight the layer:</strong>
        //   </p>
        //   <ul>
        //     <li onMouseEnter={() => this.setCurrent('lk-41')} onMouseLeave={() => this.clearCurrent()}>
        //       <code>Jaffna</code>
        //     </li>
        //     <li onMouseEnter={() => this.setCurrent('lk-12')} onMouseLeave={() => this.clearCurrent()}>
        //       <code>Gampaha</code>
        //     </li>
        //     <li onMouseEnter={() => this.setCurrent('lk-13')} onMouseLeave={() => this.clearCurrent()}>
        //       <code>Kaḷutara</code>
        //     </li>
        //   </ul>
        // </Output>
            <StyledMap style={{ width: '100%', margin: '30px auto', maxWidth: '280px' }}>
                <VectorMap {...SL} layerProps={this.props.layerProps} currentLayers={this.props.cr} />
            </StyledMap>
    //   </Wrapper>
        );
    }
}


export default Map;

