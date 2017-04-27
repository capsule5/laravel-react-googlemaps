import React, { Component } from 'react';
import styled from 'styled-components';
import { Motion, spring } from 'react-motion';
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
  /* animated */
  transform: scale(${props => props.scale});
`;

export default class Marker extends Component {

  static propTypes = {
    potager: React.PropTypes.object,
    activePotager: React.PropTypes.object.isRequired,
    setActivePotager: React.PropTypes.func.isRequired,
    $hover: React.PropTypes.bool
  };

  static defaultProps = {
    potager: {},
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

  componentWillReceiveProps(nextProps) {
    // close IW if another Marker is activated
    if (nextProps.activePotager.id !== this.props.potager.id && this.state.isOpen) {
      this.onClose();
    }
  }

  onClose() {
    this.setState({
      isOpen: false
    });
  }

  handleClick() {
    console.log('click', this.props.potager.name);
    this.setState({
      isOpen: ! this.state.isOpen
    }, () => {
      this.props.setActivePotager(this.state.isOpen ? this.props.potager : {});
    });
  }

  render() {
    const { $hover, potager } = this.props;
    const { isOpen } = this.state;

    return (

      <Wrapper $hover={$hover}>

        <Motion defaultStyle={{ scale: 1 }} style={{ scale: spring($hover ? 1.5 : 1) }}>
          { interpolated =>
            <Icon $hover={$hover} onClick={this.handleClick} {...interpolated}/>
          }
        </Motion>

        {
          ($hover || isOpen) &&
          <InfoWindow
            potager={potager}
            onClose={this.onClose}
            isOpen={isOpen}
          />
        }
      </Wrapper>
    );
  }
}
