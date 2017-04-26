import React, { Component } from 'react';
import { API } from './utils/api.js'
import Map from './components/Map';

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
    API('GET','potagers',{},
      (data) => {
        this.setPotagers(data);
      },
      (error) => {}
    );
  }

  setPotagers(data){
    this.setState({
      potagers: data
    })
  }

  render() {
    return (
      <Map potagers={this.state.potagers}/>
    );
  }
}

export default App;