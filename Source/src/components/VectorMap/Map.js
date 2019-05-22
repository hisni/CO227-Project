import React, { Component } from 'react';
import VectorMap from '@south-paw/react-vector-maps';
import SL from '@south-paw/react-vector-maps/maps/json/sri-lanka';
import styled from 'styled-components';
import { MapWrapper } from '../../shared/styled';

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
        return(
        <StyledMap style={{ width: '100%', margin: '30px auto', maxWidth: '280px' }}>
            <VectorMap {...SL} layerProps={this.props.layerProps} currentLayers={this.props.cr} />
        </StyledMap>
        );
    }
}


export default Map;

