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
import { AutoComplete } from 'material-ui';
// Redux
import { connect } from 'react-redux';
import { potagersStore } from '../../redux/potagers/potagersActions';
import { api, apiGeocode } from '../../utils/api';


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
      success: false,
      potagerAddressSource: []
    };

    this.potagerAddress = {
      type_address: '',
      formatted_address: '',
      latitude: '',
      longitude: '',
      city: '',
      postal_code: '',
      country: ''
    };

    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.notifyFormError = this.notifyFormError.bind(this);
    this.onUpdatePotagerInputAddress = this.onUpdatePotagerInputAddress.bind(this);

    this.geocoder = new google.maps.Geocoder();
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
    data.potager.address = this.potagerAddress.formatted_address;
    data.potager.city = this.potagerAddress.city;
    data.potager.country = this.potagerAddress.country;
    data.potager.postal_code = this.potagerAddress.postal_code;
    data.potager.type_address = this.potagerAddress.type_address;
    data.potager.latitude = this.potagerAddress.latitude;
    data.potager.longitude = this.potagerAddress.longitude;

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
          this.setState({ success: true, error: null });
        } else {
          // delete potager just created
          this.destroyPotager(data.user.potager_id);
          this.setState({ error: callback });
        }
      }
    );
  }

  destroyPotager(id) {
    api('DELETE', 'potagers/' + id, {},
      (callback) => {
        if (callback.success) {
          console.log('potager has been destroyed', callback.potager_id);
        } else {
          // delete potager just created
          this.setState({ error: callback });
        }
      }
    );
  }

  notifyFormError(data) {
    console.error('Form error:', data);
  }

  renderSelectNbJardiniers(max) {
    const rows = [];

    for (let i = 1;i <= max;i++) {
      rows.push(<MenuItem key={i} value={i} primaryText={i} />);
    }
    return rows;
  }

  onUpdatePotagerInputAddress(val) {
    // if (val.length > 5) {
    //   this.geocodeAddress(val);
    // }
    this.geocodeAddress(val);
  }

  geocodeAddress(address) {
    console.log('geocodeAddress', address);
    const potagerAddressSource = [];

    /*apiGeocode(address, (data) => {
      const { results, status } = data;

      console.log('results', data.results, data.status);
      if (status === 'OK') {

        results.map((result, index) => {
          potagerAddressSource.push(result.formatted_address);
        });

        this.setState({ potagerAddressSource });
      }
    });*/

    this.geocoder.geocode({
      address,
      componentRestrictions: {
        country: 'FRANCE'
      }
    }, (results, status) => {
      if (status === 'OK') {
        console.log('results', results, status);
        results.map((result, index) => {
          if (result.types[0] === 'street_address') {
            potagerAddressSource.push(result.formatted_address);
          }
        });
        this.setState({ potagerAddressSource });

        if (results.length === 1) {
          this.potagerAddress.formatted_address = results[0].formatted_address;
          this.potagerAddress.latitude = results[0].geometry.location.lat();
          this.potagerAddress.longitude = results[0].geometry.location.lng();
          this.potagerAddress.type_address = results[0].types[0];
          for (const component of results[0].address_components) {
            if (component.types[0] === 'locality') {
			        this.potagerAddress.city = component.long_name;
			      } else if (component.types[0] === 'country') {
			        this.potagerAddress.country = component.long_name;
			      } else if (component.types[0] === 'postal_code') {
			        this.potagerAddress.postal_code = component.long_name;
			      }
          }

          console.log('location found:', this.potagerAddress);
        }


      }
    });
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
              name='potager.nb_users_max'
              required
              fullWidth={true}
              floatingLabelText='Combien peut-il accueillir de jardiniers?'
              value={2}
              // menuStyle={{ width: 100 }}
              // maxHeight={210}
            >
              { this.renderSelectNbJardiniers(10)}
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
          <AutoComplete
            name='potager.address'
            hintText='Entrer l’adresse exacte de votre potager'
            floatingLabelText='Adresse *'
            fullWidth={true}
            filter={(searchText: string, key: string) => true}
            dataSource={this.state.potagerAddressSource}
            onUpdateInput = {this.onUpdatePotagerInputAddress}
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
