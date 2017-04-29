import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { RaisedButton, Dialog } from 'material-ui';
import JardinierForm from '../forms/JardinierForm';


const Wrapper = styled.li`
  padding:10px;
  border-bottom: 1px solid #CCC;
  font-size: 0.9em;
`;

const Title = styled.h3`
  margin: 0 0 5px 0;
`;


export default class Header extends PureComponent {

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
      nb_users_max
    } = potager;

    return (
      <Wrapper>
        <Title>{name}</Title>
        <div>Surface: {surface}</div>
        <div>Nombre de jardiniers max: { nb_users_max }</div>
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
      </Wrapper>
    );
  }
}
