import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PotagersList from './PotagersList';

const Wrapper = styled.div`
  width:400px;
  overflow-y:auto;
`;

export default class Header extends PureComponent {

  render() {
    return (
      <Wrapper>
        <PotagersList/>
      </Wrapper>
    );
  }
}
