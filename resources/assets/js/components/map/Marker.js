import React, { Component } from 'react';
import styled from 'styled-components';
import InfoWindow from './InfoWindow';

const MARKER_SIZE = 20;

const Wrapper = styled.div`
  position: absolute;
  zIndex: ${props => props.$hover ? 1000 : props.zIndex};
`;

const Icon = styled.div`
  backgroundColor: ${props => props.$hover ? 'green' : 'lightgreen'};
  width: ${MARKER_SIZE}px;
  height: ${MARKER_SIZE}px;
  border-radius: ${MARKER_SIZE}px;
  border: 1px solid #FFF;
  position: absolute;
  left: -${ MARKER_SIZE / 2}px;
  top: -${MARKER_SIZE / 2}px;
  cursor: pointer;
`;

export default class Marker extends Component {

  static propTypes = {
    data: React.PropTypes.object,
    $hover: React.PropTypes.bool
  };

  static defaultProps = {
    data: {},
    $hover: false
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    this.setState({
      isOpen: false
    });
  }

  handleClick() {
    console.log('click', this.props.data.name);
    this.setState({
      isOpen: ! this.state.isOpen
    });
  }

  render() {
    const { $hover, data } = this.props;
    const { isOpen } = this.state;

    return (
      <Wrapper $hover={$hover}>
        <Icon $hover={$hover} onClick={this.handleClick}/>
        {
          ($hover || isOpen) &&
          <InfoWindow
            data={data}
            onClose={this.onClose}
            isOpen={isOpen}
          />
        }
      </Wrapper>
    );
  }
}
