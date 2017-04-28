import React, { Component } from 'react';
import styled from 'styled-components';
import { FlatButton, RaisedButton } from 'material-ui';
import {
  FormsyCheckbox,
  FormsyDate,
  FormsyRadio,
  FormsyRadioGroup,
  FormsySelect,
  FormsyText,
  FormsyTime,
  FormsyToggle,
  FormsyAutoComplete
} from 'formsy-material-ui/lib';
// Redux
import { connect } from 'react-redux';
import { potagersStore } from '../../redux/potagers/potagersActions';


const Wrapper = styled.div`

`;

const FormGroup = styled.div`
  display: flex;
  justify-content: ${props => props.actions ? 'flex-end' : 'flex-start'};
  margin-top: ${props => props.actions ? '40' : '0'}px;
`;

const errorMessages = {
  wordsError: 'Please only use letters',
  numericError: 'Please provide a number',
  urlError: 'Please provide a valid URL',
  emailError: 'Please provide a valid email'
};

class PotagerForm extends Component {

  static propTypes = {
    closeDialog: React.PropTypes.func.isRequired,
    potagersStore: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      address: '',
      phone: ''
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
    console.log('submitForm', JSON.stringify(data, null, 4));
    this.props.potagersStore(data);
  }

  notifyFormError(data) {
    console.error('Form error:', data);
  }

  render() {

    const { closeDialog } = this.props;

    return (
      <Wrapper>
        <Formsy.Form
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          onValidSubmit={this.submitForm}
          onInvalidSubmit={this.notifyFormError}
        >
          <FormsyText
            name='name'
            validations='isWords'
            validationError={errorMessages.wordsError}
            required
            hintText='Entrer votre pseudo'
            floatingLabelText='Pseudo *'
            fullWidth={true}
          />
          <FormsyText
            name='email'
            validations='isEmail'
            validationError={errorMessages.emailError}
            required
            hintText='Entrer votre email'
            floatingLabelText='Email *'
            fullWidth={true}
          />

          <FormGroup actions>
            <FlatButton
              label='Cancel'
              primary={true}
              onTouchTap={closeDialog}
            />
            <RaisedButton
              type='submit'
              label='Submit'
              disabled={!this.state.canSubmit}
            />
          </FormGroup>

        </Formsy.Form>
      </Wrapper>
    );
  }
}


// const mapStateToProps = (state) => {
//   return {
//     potagers: state.potagers.list,
//     potagersHasErrored: state.potagersHasErrored,
//     potagersIsLoading: state.potagersIsLoading
//   };
// };

const mapDispatchToProps = (dispatch) => {
  return {
    potagersStore: (data) => dispatch(potagersStore(data))
  };
};

export default connect(null, mapDispatchToProps)(PotagerForm);
