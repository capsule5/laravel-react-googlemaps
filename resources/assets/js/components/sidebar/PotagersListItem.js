import React, { PureComponent } from 'react';
import styled from 'styled-components';


const Wrapper = styled.li`
  padding:10px;
  border-bottom: 1px solid #CCC;
  font-size: 0.9em;
  fontFamily: 'CircularStd-Book';
`;

const Title = styled.h2`
  margin: 0 0 5px 0;
`;


export default class Header extends PureComponent {

  static propTypes = {
    potager: React.PropTypes.object.isRequired
  };

  render() {
    const { potager } = this.props;
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
      <Wrapper>
        <Title>{name}</Title>
        <div>Surface: {surface}</div>
        <div>Nombre de jardiniers max: { nb_users_max }</div>
      </Wrapper>
    );
  }
}
