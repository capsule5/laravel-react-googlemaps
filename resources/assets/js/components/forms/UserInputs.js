import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { FormsyText } from 'formsy-material-ui/lib';
import { errorMessages } from './constants';
import { FormGroupStyles } from './styles';

const Wrapper = styled.div``;
const FormGroup = styled.div` ${FormGroupStyles} `;

class UserInputs extends PureComponent {

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
