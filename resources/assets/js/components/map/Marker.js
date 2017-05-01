import React, { PureComponent } from 'react';
import styled from 'styled-components';
import InfoWindow from './InfoWindow';
import Icon from './Icon';

const Wrapper = styled.div`
  position: absolute;
  zIndex: ${props => props.$hover ? 1000 : props.zIndex};
`;

export default class Marker extends PureComponent {

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
      isActive: false
    };

    this.toggleInfoWindow = this.toggleInfoWindow.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // close IW if another Marker is activated
    if (nextProps.activePotager.id === this.props.potager.id) {
      this.openInfoWindow();
    } else {
      this.closeInfoWindow();
    }
  }

  closeInfoWindow() {
    this.setState({
      isActive: false
    });
  }

  openInfoWindow() {
    this.setState({
      isActive: true
    });
  }


  toggleInfoWindow() {
    console.log('click', this.props.potager.name);
    if (this.state.isActive) {
      this.props.setActivePotager({});
    } else {
      this.props.setActivePotager(this.props.potager);
    }
  }

  render() {
    // console.log('this.props', this.props);
    const { $hover, potager } = this.props;
    const { isActive } = this.state;

    return (

      <Wrapper $hover={$hover}>

        <Icon
          $hover={$hover}
          isActive={isActive}
          onIconClick={this.toggleInfoWindow}
        />

        {
          ($hover || isActive) &&
          <InfoWindow
            potager={potager}
            toggleInfoWindow={this.toggleInfoWindow}
            isInfoWindowOpen={isActive}
          />
        }
      </Wrapper>
    );
  }
}
