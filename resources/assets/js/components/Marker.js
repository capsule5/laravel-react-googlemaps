import React, { Component } from 'react';

const styles = {
  marker: {
    backgroundColor: '#FFCC00',
    width: 20,
    height: 20,
    borderRadius: '100%',
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#FFFFFF'
  }
}

const Marker = ({ text }) => {
  return (
    <div style={styles.container}>
      <div style={styles.marker}></div>
      <div style={styles.text}>{text}</div>
    </div>
  );
};


export default Marker;