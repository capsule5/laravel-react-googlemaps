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
      isInfoWindowOpen: false
    };

    this.onIconClick = this.onIconClick.bind(this);
    this.onInfoWindowClose = this.onInfoWindowClose.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // close IW if another Marker is activated
    if (nextProps.activePotager.id !== this.props.potager.id && this.state.isInfoWindowOpen) {
      this.onInfoWindowClose();
    }
  }

  onInfoWindowClose() {
    this.setState({
      isInfoWindowOpen: false
    });
  }

  onIconClick() {
    console.log('click', this.props.potager.name);
    this.setState({
      isInfoWindowOpen: ! this.state.isInfoWindowOpen
    }, () => {
      this.props.setActivePotager(this.state.isInfoWindowOpen ? this.props.potager : {});
    });
  }

  render() {
    // console.log('this.props', this.props);
    const { $hover, potager } = this.props;
    const { isInfoWindowOpen } = this.state;

    return (

      <Wrapper $hover={$hover}>

        <Icon $hover={$hover} onIconClick={this.onIconClick}/>

        {
          ($hover || isInfoWindowOpen) &&
          <InfoWindow
            potager={potager}
            onInfoWindowClose={this.onInfoWindowClose}
            isInfoWindowOpen={isInfoWindowOpen}
          />
        }
      </Wrapper>
    );
  }
}
