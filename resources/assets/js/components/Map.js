import React, { Component } from 'react';

import GoogleMapReact from 'google-map-react';

import Marker from './Marker';

import { API } from '../utils/api.js'


class Map extends Component {

  static defaultProps = {
    center: {lat: 45.91, lng: 6.85},
    zoom: 13
  };

  constructor(props) {
    super(props);
  }  

  renderMarkers() {
    return (
      this.props.potagers.map((potager, index) => {
        console.log('potager', potager);
        return (
          <Marker
            key={`potager_${potager.id}`}
            lat={potager.latitude}
            lng={potager.longitude}
            text={potager.name}
          />
        );
      })
    );
  }

  render() {
    return (
      <GoogleMapReact
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >
        {this.renderMarkers()}
      </GoogleMapReact>
    );
  }
}

export default Map;