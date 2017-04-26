import React, { Component } from 'react';

import GoogleMapReact from 'google-map-react';

import Marker from './Marker';

import { API } from '../utils/api.js'


function createMapOptions(maps) {
  // next props are exposed at maps
  // "Animation", "ControlPosition", "MapTypeControlStyle", "MapTypeId",
  // "NavigationControlStyle", "ScaleControlStyle", "StrokePosition", "SymbolPath", "ZoomControlStyle",
  // "DirectionsStatus", "DirectionsTravelMode", "DirectionsUnitSystem", "DistanceMatrixStatus",
  // "DistanceMatrixElementStatus", "ElevationStatus", "GeocoderLocationType", "GeocoderStatus", "KmlLayerStatus",
  // "MaxZoomStatus", "StreetViewStatus", "TransitMode", "TransitRoutePreference", "TravelMode", "UnitSystem"
  return {
    zoomControlOptions: {
      position: maps.ControlPosition.RIGHT_CENTER,
      style: maps.ZoomControlStyle.SMALL
    },
    mapTypeControlOptions: {
      position: maps.ControlPosition.TOP_RIGHT
    },
    mapTypeControl: true,
    mapTypeId: google.maps.MapTypeId.SATELLITE
  };
}

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
        options={createMapOptions}
      >
        {this.renderMarkers()}
      </GoogleMapReact>
    );
  }
}

export default Map;