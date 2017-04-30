import React, { Component } from 'react';
import styled from 'styled-components';
import { RaisedButton } from 'material-ui';
import UserInputs from './UserInputs';
import { api } from '../../utils/api';
import Errors from './Errors';
import Success from './Success';
import { TitleStyles, FormGroupStyles } from './styles';

const Wrapper = styled.div``;
const Title = styled.h2` ${TitleStyles} `;
const FormGroup = styled.div` ${FormGroupStyles} `;

class JardinierForm extends Component {

  static propTypes = {
    potager: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      canSubmit: false,
      error: null,
      success: false
    };

    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.notifyFormError = this.notifyFormError.bind(this);
  }

  enableButton() {
    this.setState({
      canSubmit: true
    });
  }

  disableButton() {
    this.setState({
      canSubmit: false
    });
  }

  notifyFormError(data) {
    console.error('Form error:', data);
  }

  submitForm(data) {

    console.log('submitForm', this.state, JSON.stringify(data, null, 4));
    data.user.potager_id = this.props.potager.id;
    data.user.role = 'gardener';
    this.storeUser(data);
  }

  storeUser(data) {
    api('POST', 'users', data.user,
      (callback) => {
        if (callback.success) {
          this.setState({ success: true, error: null });
        } else {
          this.setState({ error: callback });
        }
      }
    );
  }

  render() {

    return (
      <Wrapper>
        {
        this.state.success ?
        <Success/> :
        <Formsy.Form
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          onValidSubmit={this.submitForm}
          onInvalidSubmit={this.notifyFormError}
        >
          <Title>Vos informations</Title>
          <UserInputs/>
          <FormGroup actions>
            <RaisedButton
              type='submit'
              label='Ajouter'
              disabled={!this.state.canSubmit}
            />
          </FormGroup>
        </Formsy.Form>
        }
        { this.state.error && <Errors error={this.state.error} /> }
      </Wrapper>

    );
  }
}

export default JardinierForm;
