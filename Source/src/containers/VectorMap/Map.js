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
        fill: #046736;
      }
      &[aria-current='true'] {
        fill: #2dc47b;
      }
    }
  }
`;

const Tooltip = styled.div`
  position: absolute;
  padding: 0.25rem;
  background: #c1fcdf;
  border: 0.2rem solid #ccc;
`;

class Map extends Component {

    render() {
        return(
        <StyledMap style={{ width: '100%', margin: '10px auto', maxWidth: '300px' }}>
            <VectorMap {...SL} layerProps={this.props.layerProps} currentLayers={this.props.cr} />
            <Tooltip style={this.props.style}>{this.props.cr}</Tooltip>
        </StyledMap>
        );
  }
}

export default Map;