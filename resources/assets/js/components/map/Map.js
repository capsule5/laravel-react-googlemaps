import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import styled from 'styled-components';
import { MARKER_SIZE } from './constants';

import { connect } from 'react-redux';
import { setActivePotager } from '../../redux/potagers/potagersActions';

const Wrapper = styled.div`
  flex:1;
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
    mapTypeControl: false,
    mapTypeId: google.maps.MapTypeId.SATELLITE
  };
};

class Map extends Component {

  static defaultProps = {
    zoom: 12
  };

  static propTypes = {
    potagers: React.PropTypes.array.isRequired,
    zoom: React.PropTypes.number.isRequired,
    setActivePotager: React.PropTypes.func.isRequired,
    activePotager: React.PropTypes.object.isRequired,
    mapCenter: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.setActivePotager = this.setActivePotager.bind(this);
  }
  

  setActivePotager(potager) {
    console.log('setActivePotager', potager);
    this.props.setActivePotager(potager);
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
            activePotager={this.props.activePotager}
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
          center={this.props.mapCenter}
          zoom={this.props.zoom}
          options={createMapOptions}
          hoverDistance={MARKER_SIZE}
        >
          {this.renderMarkers()}
        </GoogleMapReact>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    potagers: state.potagers.list,
    activePotager: state.potagers.active,
    mapCenter: state.map.center
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActivePotager: (potager) => dispatch(setActivePotager(potager))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
