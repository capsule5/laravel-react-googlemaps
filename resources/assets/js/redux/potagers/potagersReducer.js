const initialState = {
  list: [],
  isLoading: false,
  hasErrored: false,
  active: {}
};

const potagers = (state = initialState, action) => {
  switch (action.type) {
    case 'POTAGERS_IS_LOADING':
      return {
        ...state,
        isLoading: action.isLoading
      };
    case 'POTAGERS_FETCH_DATA_SUCCESS':
      return {
        ...state,
        list: action.potagers
      };
    case 'POTAGERS_HAS_ERRORED':
      return {
        ...state,
        hasErrored: action.hasErrored
      };
    case 'SET_ACTIVE_POTAGER':
      return {
        ...state,
        active: action.potager
      };
    default:
      return state;
  }
};

export default potagers;
