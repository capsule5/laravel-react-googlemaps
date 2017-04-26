import React, { Component } from 'react';

import GoogleMapReact from 'google-map-react';

import Marker from './components/Marker';

import { API } from './utils/api.js'


class App extends Component {

  static defaultProps = {
    center: {lat: 59.95, lng: 30.33},
    zoom: 11
  };

  constructor(props) {
    super(props);

    this.state = {
      potagers: []
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
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
      <GoogleMapReact
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >
        <Marker
          lat={59.955413}
          lng={30.337844}
          text={'Kreyser Avrora'}
        />
      </GoogleMapReact>
    );
  }
}

export default App;