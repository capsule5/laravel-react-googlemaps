import React, { Component } from 'react';
import styled from 'styled-components';
import { Motion, spring } from 'react-motion';

const MARKER_SIZE = 20;
const IW_MARGIN = 10;

const Wrapper = styled.div`
  position: absolute;
  bottom: ${MARKER_SIZE / 2}px;
  backgroundColor: ${props => props.isOpen ? '#FFF' : '#DDD'};
  border: 1px solid #333;
  color: #333;
  width: ${props => props.isOpen ? 300 : 150}px;
  padding: 10px;
  z-index: 999;
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

const CSSVariables = styled.div`
  --transform: ${props => `translate3d(0, ${props.y}px, 0)`};
`;

export default class InfoWindow extends Component {

  static propTypes = {
    potager: React.PropTypes.object,
    onClose: React.PropTypes.func.isRequired,
    isOpen: React.PropTypes.bool.isRequired
  };

  static defaultProps = {
    potager: {}
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }


  render() {

    const { onClose, isOpen, potager } = this.props;
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



    return (
      <Motion defaultStyle={{ y: 0 }} style={{ y: spring(-10) }}>
        { ({ y }) => (
          <CSSVariables y={ y }>
            <Wrapper isOpen={isOpen}>
              { isOpen && <CloseBtn onClick={onClose}>x</CloseBtn> }
              <div>{name}</div>
              {
                ! isOpen ?
                <div>cliquer pour plus d'infos</div> :
                <div>
                  <div>{description}</div>
                  <div>{address}</div>
                  <div>surface: {surface}</div>
                  <div>Nb de jardiniers max: {nb_users_max}</div>
                </div>
              }
            </Wrapper>
          </CSSVariables>
        )}
      </Motion>
    );
  }
}
