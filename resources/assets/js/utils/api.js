import 'whatwg-fetch';

const API_URL = 'http://127.0.0.1:8000/api/';

export const api = (method, path, body, onSuccess, onFailure) => {

  console.log('API', method, path, body);

  const reqOpts = {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };

  if (method === 'POST' || method === 'PUT') {
    reqOpts.body = JSON.stringify(body);
  }

  return fetch(`${API_URL}${path}`, reqOpts)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log('API Success', path, response);
      onSuccess(response);
    })
    .catch((error) => {
      console.log('API error', path, error);
      onFailure(error);
    });

};
