import React, { Component } from 'react';
import styled from 'styled-components';
import { FlatButton, RaisedButton, MenuItem } from 'material-ui';
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

class PotagerForm extends Component {

  static propTypes = {
    closeDialog: React.PropTypes.func.isRequired,
    potagersStore: React.PropTypes.func.isRequired
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
    // this.props.potagersStore(data.user);
    this.storePotager(data);
  }

  storePotager(data) {
    // TEMP hack
    data.potager.address = '116 Rue du Dr Paccard, 74400 Chamonix-Mont-Blanc, France';
    data.potager.city = 'Chamonix';
    data.potager.country = 'France';
    data.potager.postal_code = '74400';
    data.potager.type_address = 'street_address';
    data.potager.latitude = '45.9221766';
    data.potager.longitude = '6.868387299999999';

    api('POST', 'potagers', data.potager,
      (callback) => {
        if (callback.success) {
          data.user.potager_id = callback.potager_id;
          data.user.role = 'owner';
          this.storeUser(data);
        } else {
          this.setState({ error: callback });
        }
      }
    );
  }
  storeUser(data) {
    api('POST', 'users', data.user,
      (callback) => {
        if (callback.success) {
          this.setState({ success: true });
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

    const { closeDialog } = this.props;

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
          <Title>Votre potager</Title>
          <FormsyText
            name='potager.name'
            // validations='isWords'
            // validationError={errorMessages.wordsError}
            required
            hintText='Entrer le nom de votre potager'
            floatingLabelText='Nom *'
            fullWidth={true}
          />
          <FormGroup inline>
            <FormsySelect
              className='inline'
              name="potager.nb_users_max"
              required
              fullWidth={true}
              floatingLabelText="Combien peut-il accueillir de jardiniers?"
              value={2}
            >
              <MenuItem value={1} primaryText="1" />
              <MenuItem value={2} primaryText="2" />
              <MenuItem value={3} primaryText="3" />
            </FormsySelect>

            <FormsyText
              className='inline'
              name='potager.surface'
              validations='isNumeric'
              validationError={errorMessages.numericError}
              required
              hintText='De combien de surface disposez-vous?'
              floatingLabelText='Surface (m2) *'
              fullWidth={true}
              value={30}
            />
          </FormGroup>
          <FormsyText
            name='potager.address'
            // validations='isWords'
            // validationError={errorMessages.wordsError}
            required
            hintText='Entrer l’adresse exacte de votre potager'
            floatingLabelText='Adresse *'
            fullWidth={true}
          />


          <Title mt>Vos informations</Title>
          
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
              value={'password'}
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
