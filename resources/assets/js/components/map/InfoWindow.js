import React, { Component } from 'react';
import styled from 'styled-components';

const MARKER_SIZE = 20;
const IW_MARGIN = 10;

const Wrapper = styled.div`
  position: absolute;
  bottom: ${MARKER_SIZE / 2 + IW_MARGIN}px;
  backgroundColor: #000;
  color: #FFF;
  width: 300px;
  padding: 10px;
`;

export default class InfoWindow extends Component {

  static propTypes = {
    data: React.PropTypes.object
  };

  static defaultProps = {
    data: {}
  };

  render() {
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
    } = this.props.data;

    return (
      <Wrapper>
        <div>{name}</div>
        <div>{description}</div>
        <div>{address}</div>
        <div>surface: {surface}</div>
        <div>Nb de jardiniers: {nb_users_max}</div>
      </Wrapper>
    );
  }
}
