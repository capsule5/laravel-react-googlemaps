import React, { PureComponent } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  color: green;
`;

export default class Success extends PureComponent {

  static propTypes = {

  };

  render() {

    return (
      <Wrapper>
        Félicitations! Un membre de l'association prendra contact avec vous très prochainement
      </Wrapper>
    );
  }
}
