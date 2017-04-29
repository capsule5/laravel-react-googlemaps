import React, { Component } from 'react';
import styled from 'styled-components';
import { RaisedButton } from 'material-ui';
import { api } from '../../utils/api';
import UserInputs from './UserInputs';
import PotagerInputs from './PotagerInputs';
import Errors from './Errors';
import Success from './Success';
import { TitleStyles, FormGroupStyles } from './styles';

const Wrapper = styled.div``;
const Title = styled.h2` ${TitleStyles} `;
const FormGroup = styled.div` ${FormGroupStyles} `;


class PotagerForm extends Component {

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

  notifyFormError(data) {
    console.error('Form error:', data);
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
          this.setState({ error: callback });
        }
      }
    );
  }

  onUpdatePotagerInputAddress(val) {
    this.geocodeAddress(val);
  }

  geocodeAddress(address) {
    console.log('geocodeAddress', address);
    const potagerAddressSource = [];

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
          <Title>Votre potager</Title>
          <PotagerInputs
            potagerAddressSource={this.state.potagerAddressSource}
            onUpdatePotagerInputAddress={this.onUpdatePotagerInputAddress}
          />

          <Title mt>Vos informations</Title>
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

export default PotagerForm;
