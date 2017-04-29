import React, { Component } from 'react';
import styled from 'styled-components';
import { FormsyText } from 'formsy-material-ui/lib';
import { errorMessages } from './constants';

const Wrapper = styled.div`

`;

const FormGroup = styled.div`
  display: flex;
  justify-content: ${props => props.actions ? 'flex-end' : 'flex-start'};
  margin-top: ${props => props.actions ? '40' : '0'}px;

  .inline{ margin-right: 80px;}
  .inline:last-child{ margin-right: 0;}
`;

class UserInputs extends Component {

  render() {
    return (
      <Wrapper>

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

      </Wrapper>

    );
  }
}

export default UserInputs;
