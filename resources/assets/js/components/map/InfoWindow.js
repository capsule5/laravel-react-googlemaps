import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Motion, spring } from 'react-motion';
import { MARKER_SIZE } from './constants';
import PotagerItem from '../shared/PotagerItem';


console.log('MARKER_SIZE', MARKER_SIZE);

// use CSS variables to apply --transform to multiple elmts
const Animated = styled.div`
  --transform: ${props => `translateY(${props.y}px)`};
`;

const Wrapper = styled.div`
  position: absolute;
  bottom: ${MARKER_SIZE / 2}px;
  backgroundColor: ${props => props.isInfoWindowOpen ? '#FFF' : '#DDD'};
  border: 1px solid #333;
  color: #333;
  width: ${props => props.isInfoWindowOpen ? 300 : 150}px;
  padding: 10px;
  z-index: 2000;
  /* animated */
  transform: var(--transform);
`;

const Title = styled.h2`
  margin: 0 0 5px 0;
`;

const CloseBtn = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px;
  color: #333;
  cursor: pointer;
  &:hover{
    opacity:.5;
  }
`;



export default class InfoWindow extends PureComponent {

  static propTypes = {
    potager: React.PropTypes.object,
    toggleInfoWindow: React.PropTypes.func.isRequired,
    isInfoWindowOpen: React.PropTypes.bool.isRequired
  };

  static defaultProps = {
    potager: {}
  };

  render() {

    const { toggleInfoWindow, isInfoWindowOpen, potager } = this.props;

    // console.log('render IW', name);

    return (
      <Motion defaultStyle={{ y: 0 }} style={{ y: spring(-10) }}>
        { interpolated =>
          <Animated {...interpolated} >
            <Wrapper isInfoWindowOpen={isInfoWindowOpen}>
              { isInfoWindowOpen && <CloseBtn onClick={toggleInfoWindow}>x</CloseBtn> }
              <Title>Potager {potager.name}</Title>
              {
                ! isInfoWindowOpen ?
                <div>cliquer pour plus d'infos</div> :
                <PotagerItem
                  potager={potager}
                  parent={'InfoWindow'}
                />
              }
            </Wrapper>
          </Animated>
        }
      </Motion>
    );
  }
}
