import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PotagersListItem from './PotagersListItem';

const Wrapper = styled.ul`
  list-style: none;
  margin:0;
  padding:0;
  fontFamily: 'CircularStd-Book';
`;

class PotagersList extends Component {

  static propTypes = {
    potagers: React.PropTypes.array.isRequired
  };

  render() {

    return (
      <Wrapper>
        {
          this.props.potagers.map((potager, index) => {
            return (
              <PotagersListItem
                key={`potager_list_${potager.id}`}
                potager={potager}
              />
            );
          })
        }
      </Wrapper>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    potagers: state.potagers.list,
    potagersHasErrored: state.potagersHasErrored,
    potagersIsLoading: state.potagersIsLoading
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {};
// };

export default connect(mapStateToProps, null)(PotagersList);
