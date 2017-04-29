import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  color: red;
  font-size: 12px;
  ul {
     list-style-position: inside;
     padding: 0;
     margin: 10px 0 0 0;
  }
`;

export default class Errors extends Component {

  static propTypes = {
    error: React.PropTypes.object.isRequired
  };

  render() {
    const { error } = this.props;

    return (
      <Wrapper>
        Une erreur est survenue lors de l'enregistrement:
        <ul>
          {
            Object.keys(error).map((key, index) => {
              return <li key={index} value={key}>{error[key]}</li>;
            })
          }
        </ul>
      </Wrapper>
    );
  }
}
