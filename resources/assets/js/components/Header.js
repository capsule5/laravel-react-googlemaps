import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import PotagerForm from './forms/PotagerForm';

const Wrapper = styled.header`
  flex: 0 0 auto;
  height: 60px;
  background-color:#FFF;
  color:#000;
  fontFamily: 'CircularStd-Book';
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

const Title = styled.h1`
  font-size: 20px;
`;

export default class Header extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const actions = [
      <FlatButton
        label='Cancel'
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label='Submit'
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />
    ];

    return (
      <Wrapper>
        <Title>Le potager de mon pote âgé</Title>
        <div>
          <RaisedButton label="Ajouter un potager" onTouchTap={this.handleOpen} />
          <Dialog
            title="Ajouter un potager"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            <PotagerForm/>
          </Dialog>
        </div>
      </Wrapper>
    );
  }
}
