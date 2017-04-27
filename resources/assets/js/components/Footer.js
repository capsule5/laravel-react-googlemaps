import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.footer`
  flex: 0 0 auto;
  display: flex;
  height: 40px;
  background-color: #FFF;
  fontFamily: 'CircularStd-Book';
  align-items: center;
  justify-content: center;
  font-size:12px;
`;

const Footer = () => {
  return (
    <Wrapper>
      BOUTCH À BOUTCH © 2017
    </Wrapper>
  );
};

export default Footer;
