import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { RaisedButton, Dialog } from 'material-ui';
import JardinierForm from '../forms/JardinierForm';


const Wrapper = styled.div`

`;

const Title = styled.h3`
  margin: 0 0 5px 0;
`;


export default class PotagersListItem extends PureComponent {

  static propTypes = {
    potager: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  handleOpenDialog() {
    this.setState({ open: true });
  }

  handleCloseDialog() {
    this.setState({ open: false });
  }


  render() {
    const { potager } = this.props;
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
      gardeners_count
    } = potager;

    const nbAvailablePlaces = nb_users_max - gardeners_count;
    const isFull = nbAvailablePlaces <= 0;

    return (
      <Wrapper>
        <Title>{name}</Title>
        <div>Surface: {surface} m²</div>
        <div>owner: {owners[0].name}</div>
        <div>Nombre de jardiniers max: { nb_users_max }</div>
        <div>place(s) disponible(s): { isFull ? 'COMPLET' : `${nbAvailablePlaces} places disponibles` }</div>
        {
          ! isFull &&
          <div>
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
          </div>
        }
      </Wrapper>
    );
  }
}
