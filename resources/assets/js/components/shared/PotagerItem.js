import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { FlatButton, RaisedButton, Dialog } from 'material-ui';
import JardinierForm from '../forms/JardinierForm';


const Wrapper = styled.div`

`;

const Title = styled.h3`
  margin: 0 0 5px 0;
`;


const ButtonWrapper = styled.div`
  margin: 10px 0 0 0;
`;


export default class PotagerItem extends PureComponent {

  static defaultProps = {
    setActivePotager: () => {},
    setMapCenter: () => {}
  };

  static propTypes = {
    potager: React.PropTypes.object.isRequired,
    parent: React.PropTypes.string.isRequired,
    setActivePotager: React.PropTypes.func,
    setMapCenter: React.PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.lookAtMap = this.lookAtMap.bind(this);
  }

  handleOpenDialog() {
    this.setState({ open: true });
  }

  handleCloseDialog() {
    this.setState({ open: false });
  }

  lookAtMap() {
    const { potager } = this.props;
    const center = { lat: parseFloat(potager.latitude), lng: parseFloat(potager.longitude) };

    console.log('lookAtMap', center);

    this.props.setActivePotager(potager);
    this.props.setMapCenter(center);
  }

  render() {
    const { potager, parent } = this.props;
    const {
      name,
      description,
      is_valid,
      latitude,
      longitude,
      address,
      city,
      country,
      postal_code,
      type_address,
      surface,
      nb_users_max,
      owners,
      gardeners_count,
      is_full,
      remaining_gardeners
    } = potager;


    return (
      <Wrapper>
        { parent !== 'InfoWindow' && <Title>Potager {name}</Title> }
        <div>Surface: {surface} m²</div>
        <div>Propriétaire: {owners[0].name}</div>
        <div>Nombre de jardiniers: { gardeners_count }</div>
        <div>{ is_full ? 'COMPLET' : `${remaining_gardeners} places disponibles` }</div>
        { parent !== 'InfoWindow' &&
          <FlatButton
            label='voir sur la carte'
            onTouchTap={ this.lookAtMap }
          />
         }
        {
          ! is_full &&
          <ButtonWrapper>
            <RaisedButton
              fullWidth={true}
              label='Je souhaite jardiner ici'
              onTouchTap={this.handleOpenDialog}
            />
            <Dialog
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleCloseDialog}
            >
              <JardinierForm
                closeDialog={this.handleCloseDialog}
                potager={potager}
              />
            </Dialog>
          </ButtonWrapper>
        }
      </Wrapper>
    );
  }
}
