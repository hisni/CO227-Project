import React, { Component } from 'react';
import VectorMap from '@south-paw/react-vector-maps';
import SL from '@south-paw/react-vector-maps/maps/json/sri-lanka';
import styled from 'styled-components';
import { MapWrapper } from '../../shared/styled';

const StyledMap = styled(MapWrapper)`
  svg {
    path{
      fill: #07974f;
      cursor: pointer;
      &:hover {
        fill: #2dc47b;
      }
      &[aria-current='true'] {
        fill: #2dc47b;
      }
    }
  }
`;


class Map extends Component {
    render() {
        return(
        <StyledMap style={{ width: '100%', margin: '10px auto', maxWidth: '300px' }}>
            <VectorMap {...SL} layerProps={this.props.layerProps} currentLayers={this.props.cr} />
        </StyledMap>
        );
    }
}


export default Map;

