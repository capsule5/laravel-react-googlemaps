import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.header`
  flex: 0 0 auto;
  height: 40px;
  background-color:#FFF;
  color:#000;
  fontFamily: 'Circular-Black';
  display: flex;
  align-items: center;
  padding: 0 20px;
`;

const Title = styled.h1`
  font-size: 20px;
`;

const Header = () => {
  return (
    <Wrapper>
      <Title>Le potager de mon pote agé</Title>
    </Wrapper>
  );
};

export default Header;
