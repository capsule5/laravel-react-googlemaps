import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Motion, spring } from 'react-motion';
import { MARKER_SIZE } from './constants';

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
  z-index: 999;
  /* animated */
  transform: var(--transform);
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
    onInfoWindowClose: React.PropTypes.func.isRequired,
    isInfoWindowOpen: React.PropTypes.bool.isRequired
  };

  static defaultProps = {
    potager: {}
  };

  render() {

    const { onInfoWindowClose, isInfoWindowOpen, potager } = this.props;
    const {
      name,
      description,
      is_valid,
      latitude,
      longitude,
      address,
      city,
      country,
      postal_code,
      type_address,
      surface,
      nb_users_max
    } = potager;

    // console.log('render IW', name);

    return (
      <Motion defaultStyle={{ y: 0 }} style={{ y: spring(-10) }}>
        { interpolated =>
          <Animated {...interpolated} >
            <Wrapper isInfoWindowOpen={isInfoWindowOpen}>
              { isInfoWindowOpen && <CloseBtn onClick={onInfoWindowClose}>x</CloseBtn> }
              <div>{name}</div>
              {
                ! isInfoWindowOpen ?
                <div>cliquer pour plus d'infos</div> :
                <div>
                  <div>{description}</div>
                  <div>{address}</div>
                  <div>surface: {surface}</div>
                  <div>Nb de jardiniers max: {nb_users_max}</div>

                </div>
              }
            </Wrapper>
          </Animated>
        }
      </Motion>
    );
  }
}
