import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Map from './components/map/Map';
import Sidebar from './components/sidebar/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import styled from 'styled-components';
import '../fonts/fonts.css';
// Redux
import { connect } from 'react-redux';
import { potagersFetchData } from './redux/potagers/potagersActions';


injectTapEventPlugin();

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow:'hidden';
`;

const Main = styled.div`
  background-color: #FFF;
  display: flex;
  flex: 1;
  position: relative;/* need this to position inner content */
`;

class App extends Component {

  static defaultProps = {
    // potagers: [],
    center: { lat: 45.91, lng: 6.85 },
    zoom: 12
  };

  static propTypes = {
    potagersFetchData: React.PropTypes.func.isRequired,
    potagers: React.PropTypes.array.isRequired
  };

  componentDidMount() {
    // this.getPotagers();
    this.props.potagersFetchData();
  }

  render() {
    return (
      <MuiThemeProvider>
        <Wrapper>
          <Header/>
          <Main>
            <Map potagers={this.props.potagers}/>
            <Sidebar/>
          </Main>
          <Footer/>
        </Wrapper>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    potagers: state.potagers.list,
    potagersHasErrored: state.potagersHasErrored,
    potagersIsLoading: state.potagersIsLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    potagersFetchData: () => dispatch(potagersFetchData())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

