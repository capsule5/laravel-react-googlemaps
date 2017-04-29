import React, { Component } from 'react';
import styled from 'styled-components';
import { FormsyText, FormsySelect } from 'formsy-material-ui/lib';
import { AutoComplete, MenuItem } from 'material-ui';
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

class PotagerInputs extends Component {

  static propTypes = {
    // closeDialog: React.PropTypes.func.isRequired,
    potagerAddressSource: React.PropTypes.array.isRequired,
    onUpdatePotagerInputAddress: React.PropTypes.func.isRequired
  };

  renderSelectNbJardiniers(max) {
    const rows = [];

    for (let i = 1;i <= max;i++) {
      rows.push(<MenuItem key={i} value={i} primaryText={i} />);
    }
    return rows;
  }

  render() {
    return (
      <Wrapper>

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
            // value={2}
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
            // value={30}
          />
        </FormGroup>
        <AutoComplete
          name='potager.address'
          hintText='Entrer l’adresse exacte de votre potager'
          floatingLabelText='Adresse *'
          fullWidth={true}
          filter={(searchText: string, key: string) => true}
          dataSource={this.props.potagerAddressSource}
          onUpdateInput = {this.props.onUpdatePotagerInputAddress}
        />

      </Wrapper>

    );
  }
}

export default PotagerInputs;
