import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.header`
  flex: 0 0 auto;
  height: 40px;
  background-color:#000;
  color:#FFF;
  fontFamily: 'Circular-Black';
`;

const Header = () => {
  return (
    <Wrapper>
      Le potager de mon pote agé
    </Wrapper>
  );
};

export default Header;
