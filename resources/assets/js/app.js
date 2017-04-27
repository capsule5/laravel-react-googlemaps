import React, { Component } from 'react';
import { api } from './utils/api.js';
import Map from './components/map/Map';
import Header from './components/Header';
import Footer from './components/Footer';
import styled from 'styled-components';
// import '../fonts/fonts.css';
// import './utils/styles.js';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow:'hidden';
`;

const Main = styled.div`
  background-color: #CCC;
  flex: 1;
  position: relative;/* need this to position inner content */
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
        <Main>
          <Map potagers={this.state.potagers}/>
        </Main>
        <Footer/>
      </Wrapper>
    );
  }
}

export default App;
