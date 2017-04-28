import { api } from '../../utils/api';

const potagersHasErrored = (bool) => {
  return {
    type: 'POTAGERS_HAS_ERRORED',
    hasErrored: bool
  };
};

const potagersIsLoading = (bool) => {
  return {
    type: 'POTAGERS_IS_LOADING',
    isLoading: bool
  };
};

const potagersFetchDataSuccess = (potagers) => {
  return {
    type: 'POTAGERS_FETCH_DATA_SUCCESS',
    potagers
  };
};

const potagersStoreSuccess = (data) => {
  console.log('potagersStoreSuccess', data);
  return {
    type: 'POTAGERS_STORE_SUCCESS',
    data
  };
};

// index
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

// store
export const potagersStore = (body) => {
  console.log('potagersFetchData');
  return (dispatch) => {
    dispatch(potagersIsLoading(true));

    api('POST', 'potagerWithUser', body,
      (data) => {
        dispatch(potagersIsLoading(false));
        dispatch(potagersHasErrored(false));
        dispatch(potagersStoreSuccess(data));
      },
      (error) => {
        dispatch(potagersIsLoading(false));
        dispatch(potagersHasErrored(true));
      }
    );
  };
};

