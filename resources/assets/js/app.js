import React, { Component } from 'react';
import { api } from './utils/api.js';
import Map from './components/Map';
import Header from './components/Header';
import Footer from './components/Footer';

import styled from 'styled-components';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
`;


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      potagers: []
    };
  }

  componentDidMount() {
    this.getPotagers();
  }

  getPotagers() {
    api('GET', 'potagers', {},
      (data) => {
        this.setPotagers(data);
      },
      (error) => {}
    );
  }

  setPotagers(data) {
    this.setState({
      potagers: data
    });
  }

  render() {
    return (
      <Wrapper>
        <Header/>
        <Map potagers={this.state.potagers}/>
        <Footer/>
      </Wrapper>
    );
  }
}

export default App;
