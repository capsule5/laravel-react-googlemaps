import React, { Component } from 'react';

import GoogleMapReact from 'google-map-react';

import Marker from './components/Marker';


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
    fetch('http://127.0.0.1:8000/api/potagers', {
      method: 'get'
    }).then(function(response) {
      // Convert to JSON
	    return response.json();
    }).then(function(data) {
      // data is a JS object
      console.log('data', data);
      this.setPotagers(response)
    }).catch(function(error) {
      console.log('error', error);
    });
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