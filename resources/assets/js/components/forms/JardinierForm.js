import React, { Component } from 'react';
import styled from 'styled-components';
import { FlatButton, RaisedButton, MenuItem } from 'material-ui';
import {
  // FormsyCheckbox,
  // FormsyDate,
  // FormsyRadio,
  // FormsyRadioGroup,
  // FormsyTime,
  // FormsyToggle
  FormsySelect,
  FormsyText
} from 'formsy-material-ui/lib';

import { api } from '../../utils/api';


const Wrapper = styled.div`

`;

const Title = styled.h2`
  margin-top: ${props => props.mt ? '40' : '0'}px;
  margin-bottom: 0;
  font-size: 26px;
  font-weight: normal;
  color:#333;
`;

const FormGroup = styled.div`
  display: flex;
  justify-content: ${props => props.actions ? 'flex-end' : 'flex-start'};
  margin-top: ${props => props.actions ? '40' : '0'}px;

  .inline{ margin-right: 80px;}
  .inline:last-child{ margin-right: 0;}
`;

const Error = styled.div`
  color: red;
  font-size: 12px;
  ul {
     list-style-position: inside;
     padding: 0;
     margin: 10px 0 0 0;
  }
`;

const Success = styled.div`
  color: green;
`;

const errorMessages = {
  wordsError: 'Please only use letters',
  numericError: 'Please provide a number',
  urlError: 'Please provide a valid URL',
  emailError: 'Please provide a valid email'
};

class JardinierForm extends Component {

  static propTypes = {
    closeDialog: React.PropTypes.func.isRequired,
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

  getInitialState() {
    return {
      canSubmit: false
    };
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

  notifyFormError(data) {
    console.error('Form error:', data);
  }

  render() {

    const { closeDialog, potager } = this.props;

    return (
      <Wrapper>
        {
        this.state.success ?
        <Success>
          Félicitations! Un membre de l'association prendra contact avec vous très prochainement
        </Success> :
        <Formsy.Form
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          onValidSubmit={this.submitForm}
          onInvalidSubmit={this.notifyFormError}
        >
          <Title>Vos informations</Title>

          <FormGroup inline>
            <FormsyText
              className='inline'
              name='user.email'
              validations='isEmail'
              validationError={errorMessages.emailError}
              required
              hintText='Entrer votre email'
              floatingLabelText='Email *'
              fullWidth={true}
            />
            <FormsyText
              className='inline'
              name='user.password'
              // validations='isNumeric'
              // validationError={errorMessages.numericError}
              required
              hintText='Entrer votre mot de passe'
              floatingLabelText='Mot de passe *'
              fullWidth={true}
              // value={'password'}
            />
          </FormGroup>
          <FormGroup inline>
            <FormsyText
              className='inline'
              name='user.name'
              validations='isWords'
              validationError={errorMessages.wordsError}
              required
              hintText='Entrer votre pseudo'
              floatingLabelText='Pseudo *'
              fullWidth={true}
            />
            <FormsyText
              className='inline'
              name='user.phone'
              validations='isNumeric'
              validationError={errorMessages.numericError}
              required
              hintText='Entrer votre numéro de téléphone'
              floatingLabelText='Téléphone *'
              fullWidth={true}
            />
          </FormGroup>

          <FormGroup actions>
            <RaisedButton
              type='submit'
              label='Ajouter'
              disabled={!this.state.canSubmit}
            />
          </FormGroup>
        </Formsy.Form>
        }
        { this.state.error &&
          <Error>
            Une erreur est survenue lors de l'enregistrement:
            <ul>
              {
                Object.keys(this.state.error).map((key, index) => {
                  return <li key={index} value={key}>{this.state.error[key]}</li>;
                })
              }
            </ul>
          </Error>
        }
      </Wrapper>

    );
  }
}

export default JardinierForm;
