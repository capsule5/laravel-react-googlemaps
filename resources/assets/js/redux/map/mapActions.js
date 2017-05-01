
export const setMapCenter = (center) => {
  console.log('setMapCenterfzeger', center);
  return {
    type: 'SET_CENTER',
    center
  };
};
