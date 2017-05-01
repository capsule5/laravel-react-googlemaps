import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Motion, spring } from 'react-motion';
import { MARKER_SIZE } from './constants';

const Wrapper = styled.div`
  backgroundColor: ${props => props.$hover || props.isActive ? 'green' : 'lightgreen'};
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

export default class Marker extends PureComponent {

  static propTypes = {
    $hover: React.PropTypes.bool.isRequired,
    isActive: React.PropTypes.bool.isRequired,
    onIconClick: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  render() {
    // console.log('this.props', this.props);
    const { $hover, isActive, onIconClick } = this.props;

    return (
      <Motion defaultStyle={{ scale: 1 }} style={{ scale: spring(($hover || isActive) ? 1.5 : 1) }}>
        { interpolated =>
          <Wrapper $hover={$hover} isActive={isActive} onClick={onIconClick} {...interpolated}/>
        }
      </Motion>
    );
  }
}
