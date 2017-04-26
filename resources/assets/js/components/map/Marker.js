import React, { Component } from 'react';
import styled from 'styled-components';
import InfoWindow from './InfoWindow';

const MARKER_SIZE = 20;

const Wrapper = styled.div`
  position: absolute;
  zIndex: ${props => props.$hover ? 1000 : props.zIndex};
`;

const Icon = styled.div`
  backgroundColor: ${props => props.$hover ? 'green' : 'lightgreen'};
  width: ${MARKER_SIZE}px;
  height: ${MARKER_SIZE}px;
  border-radius: ${MARKER_SIZE}px;
  border: 1px solid #FFF;
  position: absolute;
  left: -${ MARKER_SIZE / 2}px;
  top: -${MARKER_SIZE / 2}px;
  cursor: pointer;
`;

export default class Marker extends Component {

  static propTypes = {
    data: React.PropTypes.object,
    $hover: React.PropTypes.bool
  };

  static defaultProps = {
    data: {},
    $hover: false
  };

  render() {
    const { $hover, data } = this.props;

    return (
      <Wrapper $hover={$hover}>
        <Icon $hover={$hover}/>
        {$hover && <InfoWindow data={data}/>}
      </Wrapper>
    );
  }
}
