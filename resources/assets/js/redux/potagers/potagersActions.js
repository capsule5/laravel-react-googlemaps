import { api } from '../../utils/api';

export const potagersHasErrored = (bool) => {
  return {
    type: 'POTAGERS_HAS_ERRORED',
    hasErrored: bool
  };
};

export const potagersIsLoading = (bool) => {
  return {
    type: 'POTAGERS_IS_LOADING',
    isLoading: bool
  };
};

export const potagersFetchDataSuccess = (potagers) => {
  return {
    type: 'POTAGERS_FETCH_DATA_SUCCESS',
    potagers
  };
};


export const potagersFetchData = () => {
  console.log('potagersFetchData');
  return (dispatch) => {
    dispatch(potagersIsLoading(true));

    api('GET', 'potagers', {},
      (data) => {
        dispatch(potagersIsLoading(false));
        dispatch(potagersHasErrored(false));
        dispatch(potagersFetchDataSuccess(data));
      },
      (error) => {
        dispatch(potagersIsLoading(false));
        dispatch(potagersHasErrored(true));
      }
    );
  };
};
