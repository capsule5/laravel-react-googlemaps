const initialState = {
  center: { lat: 45.91, lng: 6.85 }
};

const map = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CENTER':
      return {
        ...state,
        center: action.center
      };
    default:
      return state;
  }
};

export default map;
