import React, { Component } from 'react';
import styled from 'styled-components';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';

const Wrapper = styled.div`

`;

class PotagerForm extends Component {

  // static propTypes = {
  //   potagers: React.PropTypes.array.isRequired
  // };

  render() {

    const actions = [
      <FlatButton
        label='Cancel'
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label='Submit'
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />
    ];

    return (
      <Wrapper>
        <TextField
          hintText="Hint Text"
          floatingLabelText="Floating Label Text"
        />
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

// const mapDispatchToProps = (dispatch) => {
//   return {};
// };

export default connect(null, null)(PotagerForm);
