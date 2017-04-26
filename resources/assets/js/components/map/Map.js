import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import styled from 'styled-components';

const Wrapper = styled.div`
  flex: 1;
  position: relative;/* need this to position inner content */
  fontFamily: 'Circular-Black';
`;

const createMapOptions = function(maps) {
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
};

class Map extends Component {

  static defaultProps = {
    potagers: [],
    center: { lat: 45.91, lng: 6.85 },
    zoom: 12
  };

  static propTypes = {
    potagers: React.PropTypes.array,
    center: React.PropTypes.object,
    zoom: React.PropTypes.number
  };

  constructor(props) {
    super(props);

    this.state = {
      activePotager: {}
    };

    this.setActivePotager = this.setActivePotager.bind(this);
  }

  setActivePotager(potager) {
    console.log('setActivePotager', potager);
    this.setState({ activePotager: potager });
  }

  renderMarkers() {
    console.log('renderMarkers', this.props.potagers);
    return (
      this.props.potagers.map((potager, index) => {
        return (
          <Marker
            key={`potager_${potager.id}`}
            lat={potager.latitude}
            lng={potager.longitude}
            potager={potager}
            activePotager={this.state.activePotager}
            setActivePotager={this.setActivePotager}
          />
        );
      })
    );
  }

  render() {
    return (
      <Wrapper>
        <GoogleMapReact
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          options={createMapOptions}
          hoverDistance={20}
        >
          {this.renderMarkers()}
        </GoogleMapReact>
      </Wrapper>
    );
  }
}

export default Map;
