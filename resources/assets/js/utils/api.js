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

export const apiGeocode = (address, onSuccess, onFailure) => {

  const key = 'AIzaSyBNfr0R9KSsk--OABEPPV8iZ3GA-jZArSU';
  // const language = 'en';
  const path = 'https://maps.googleapis.com/maps/api/geocode/json';
  const reqOpts = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  return fetch(`${path}?key=${key}&address=${address}&components=country:FRANCE`, reqOpts)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log('apiGeocode Success', path, response);
      onSuccess(response);
    })
    .catch((error) => {
      console.log('apiGeocode error', path, error);
      onFailure(error);
    });

};
