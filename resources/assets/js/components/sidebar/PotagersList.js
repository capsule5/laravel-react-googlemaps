import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PotagerItem from '../shared/PotagerItem';

const Wrapper = styled.ul`
  list-style: none;
  margin:0;
  padding:0;
  fontFamily: 'CircularStd-Book';
`;

const ListItem = styled.li`
  padding:20px 20px;
  border-bottom: 1px solid #CCC;
  font-size: 0.9em;
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
              <ListItem key={`potager_list_${potager.id}`}>
                <PotagerItem
                  potager={potager}
                  parent={'PotagersList'}
                />
              </ListItem>
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
