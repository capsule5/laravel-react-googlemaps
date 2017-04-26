const API_URL = 'http://127.0.0.1:8000/api/';

export const API = (method, path, body, onSuccess, onFailure) => {
    
  console.log('Api', path);

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
      console.log('API Success', path);
      onSuccess(response);
    })
    .catch((error) => {
      console.log('Api error', error);
      onFailure(error);
    });

};
