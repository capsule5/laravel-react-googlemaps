import React, { Component } from 'react';
import styled from 'styled-components';
import PotagerItem from '../shared/PotagerItem';

import { connect } from 'react-redux';
import { setActivePotager } from '../../redux/potagers/potagersActions';
import { setMapCenter } from '../../redux/map/mapActions';


const Wrapper = styled.ul`
  list-style: none;
  margin:0;
  padding:0;
  fontFamily: 'CircularStd-Book';
`;

const ListItem = styled.li`
  padding:20px 20px;
  border-bottom: 1px solid #CCC;
  font-size: 0.9em;
`;

class PotagersList extends Component {

  static propTypes = {
    potagers: React.PropTypes.array.isRequired,
    setActivePotager: React.PropTypes.func.isRequired,
    activePotager: React.PropTypes.object.isRequired,
    setMapCenter: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.setActivePotager = this.setActivePotager.bind(this);
    this.setMapCenter = this.setMapCenter.bind(this);
  }

  setActivePotager(potager) {
    console.log('setActivePotager', potager);
    this.props.setActivePotager(potager);
  }

  setMapCenter(center) {
    console.log('setMapCenter', center);
    this.props.setMapCenter(center);
  }

  render() {

    return (
      <Wrapper>
        {
          this.props.potagers.map((potager, index) => {
            return (
              <ListItem key={`potager_list_${potager.id}`}>
                <PotagerItem
                  potager={potager}
                  parent={'PotagersList'}
                  activePotager={this.props.activePotager}
                  setActivePotager={this.setActivePotager}
                  setMapCenter={this.setMapCenter}
                />
              </ListItem>
            );
          })
        }
      </Wrapper>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    potagers: state.potagers.list,
    activePotager: state.potagers.active,
    potagersHasErrored: state.potagersHasErrored,
    potagersIsLoading: state.potagersIsLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActivePotager: (potager) => dispatch(setActivePotager(potager)),
    setMapCenter: (center) => dispatch(setMapCenter(center))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PotagersList);
