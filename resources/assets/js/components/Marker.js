import React, { Component } from 'react';

const Marker = ({ text }) => {
  return (
    <div style={{backgroundColor: '#FFCC00', width: 100, height: 100, borderRadius: 100, display:'flex', alignItems: 'center', justifyContent: 'center'}}>
      {text}
    </div>
  );
};


export default Marker;