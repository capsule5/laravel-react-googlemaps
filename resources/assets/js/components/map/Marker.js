import React from 'react';

const styles = {
  marker: {
    backgroundColor: '#FFCC00',
    width: 20,
    height: 20,
    borderRadius: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#FFFFFF'
  }
};

const Marker = ({ text }) => {
  return (
    <div style={styles.container}>
      <div style={styles.marker}></div>
      <div style={styles.text}>{text}</div>
    </div>
  );
};

Marker.defaultProps = {
  text: ''
};

Marker.propTypes = {
  text: React.PropTypes.string
};

export default Marker;
