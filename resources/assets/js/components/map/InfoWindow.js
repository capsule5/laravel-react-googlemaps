import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { RaisedButton, Dialog } from 'material-ui';
import { Motion, spring } from 'react-motion';
import { MARKER_SIZE } from './constants';
import JardinierForm from '../forms/JardinierForm';


console.log('MARKER_SIZE', MARKER_SIZE);

// use CSS variables to apply --transform to multiple elmts
const Animated = styled.div`
  --transform: ${props => `translateY(${props.y}px)`};
`;

const Wrapper = styled.div`
  position: absolute;
  bottom: ${MARKER_SIZE / 2}px;
  backgroundColor: ${props => props.isInfoWindowOpen ? '#FFF' : '#DDD'};
  border: 1px solid #333;
  color: #333;
  width: ${props => props.isInfoWindowOpen ? 300 : 150}px;
  padding: 10px;
  z-index: 999;
  /* animated */
  transform: var(--transform);
`;

const Title = styled.h2`
  margin: 0 0 5px 0;
`;

const CloseBtn = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px;
  color: #333;
  cursor: pointer;
  &:hover{
    opacity:.5;
  }
`;



export default class InfoWindow extends PureComponent {

  static propTypes = {
    potager: React.PropTypes.object,
    onInfoWindowClose: React.PropTypes.func.isRequired,
    isInfoWindowOpen: React.PropTypes.bool.isRequired
  };

  static defaultProps = {
    potager: {}
  };

  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  handleOpenDialog() {
    this.setState({ open: true });
  }

  handleCloseDialog() {
    this.setState({ open: false });
  }

  render() {

    const { onInfoWindowClose, isInfoWindowOpen, potager } = this.props;
    const {
      id,
      name,
      description,
      is_valid,
      latitude,
      longitude,
      address,
      city,
      country,
      postal_code,
      type_address,
      surface,
      nb_users_max
    } = potager;

    // console.log('render IW', name);

    return (
      <Motion defaultStyle={{ y: 0 }} style={{ y: spring(-10) }}>
        { interpolated =>
          <Animated {...interpolated} >
            <Wrapper isInfoWindowOpen={isInfoWindowOpen}>
              { isInfoWindowOpen && <CloseBtn onClick={onInfoWindowClose}>x</CloseBtn> }
              <Title>{name}</Title>
              {
                ! isInfoWindowOpen ?
                <div>cliquer pour plus d'infos</div> :
                <div>
                  <div>{description}</div>
                  <div>{address}</div>
                  <div>surface: {surface}</div>
                  <div>Nb de jardiniers max: {nb_users_max}</div>
                  <RaisedButton
                    fullWidth={true}
                    label='Je souhaite jardiner ici'
                    onTouchTap={this.handleOpenDialog}
                  />
                  <Dialog
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleCloseDialog}
                  >
                    <JardinierForm
                      closeDialog={this.handleCloseDialog}
                      potager={potager}
                    />
                  </Dialog>
                </div>
              }
            </Wrapper>
          </Animated>
        }
      </Motion>
    );
  }
}
