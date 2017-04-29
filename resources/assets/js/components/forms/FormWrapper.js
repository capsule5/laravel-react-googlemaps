import React, { Component } from 'react';
import styled from 'styled-components';
import { FormGroupStyles } from './styles';

const Wrapper = styled.div``;
const FormGroup = styled.div` ${FormGroupStyles} `;

class FormWrapper extends Component {

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

  submitForm() {
    
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

          {this.props.children}

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
export default FormWrapper;
