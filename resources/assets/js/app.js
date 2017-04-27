import React, { Component } from 'react';
import { api } from './utils/api.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Map from './components/map/Map';
import Header from './components/Header';
import Footer from './components/Footer';
import styled from 'styled-components';
import '../fonts/fonts.css';
// import './utils/styles.js';
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

const Sidebar = styled.div`
  width:400px;
  overflow-y:auto;
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
            <Sidebar>
              <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque veritatis adipisci debitis, dolores vitae expedita architecto consequatur cumque quas ratione cum, similique perspiciatis totam hic! Ipsam error aut a, accusantium!</div>
              <div>Hic blanditiis cumque adipisci! Dolores facere necessitatibus sit natus consectetur magni aperiam eos quos laudantium atque beatae, corporis perferendis, delectus explicabo, suscipit? Explicabo ducimus optio temporibus veritatis repellendus qui labore.</div>
              <div>Optio veniam, animi, reprehenderit, repellendus reiciendis dignissimos ipsum tempore cum explicabo porro totam tenetur maxime ducimus quisquam beatae unde rem assumenda. Alias odit eius veniam natus voluptatibus porro ullam repellat.</div>
              <div>Dolor dignissimos, molestiae aut accusantium harum sunt earum dolorem tempore consequatur deserunt quidem ipsam impedit culpa iusto hic totam assumenda quo fuga eaque ab officiis. Molestiae voluptatibus ad nam molestias.</div>
              <div>Labore porro non praesentium voluptates, tempore rerum mollitia facere incidunt animi ipsa dolorem aliquam sint ipsum voluptatum molestiae, at qui nam! Maxime, dolorem odio. Explicabo modi possimus, consequuntur necessitatibus iure.</div>
              <div>Quas eos veniam voluptates odio laudantium doloremque temporibus provident recusandae sequi cum praesentium corporis pariatur fuga quisquam, quos vel quam. Esse animi neque consequuntur cum sed dolorem deserunt minus doloremque.</div>
              <div>Similique culpa pariatur aut eaque est optio sed sapiente, soluta, numquam laudantium hic, voluptatem quod iure placeat. Earum rem dolor delectus officiis repellat quia harum reprehenderit, at sapiente eaque ipsam?</div>
              <div>Sequi dolor assumenda, rem expedita dolores voluptas quis officiis facere eaque magni aut, repellat blanditiis maxime eligendi asperiores placeat vitae sed aliquam ratione, nulla commodi eveniet. Culpa, ullam commodi laudantium.</div>
              <div>Alias mollitia voluptatem fuga voluptas quidem accusantium eum minima, illo et harum, placeat vel? Doloremque sapiente placeat doloribus minima iste illo est, quis? Itaque, facere, assumenda fugit odit error aliquid!</div>
              <div>Laboriosam praesentium ut a, autem accusantium labore distinctio saepe assumenda tempora eaque nesciunt, totam quae odio doloremque placeat numquam obcaecati est? Eum ipsa esse, adipisci labore aspernatur incidunt iure accusamus.</div>
            </Sidebar>
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

