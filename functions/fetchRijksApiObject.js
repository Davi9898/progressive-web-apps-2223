import fetch from 'node-fetch';

export function fetchRijksApiObject(ObjectID) {

const urlApi = 'https://www.rijksmuseum.nl/api/nl/collection'
const apiKey = 'BQfKnS2c'

// String Interpolatie doormiddel van backticks
// Expressions zijn wrapped in ${}
const url = `${urlApi}/${ObjectID}?key=${apiKey}`;

// return Om Error state te testen.

return fetch(url)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data)
        //data.artObjects.length <= 1
        // Images filteren die een image hebben en map roept het createListItem aan 
        return data;
        
    })
    .catch(error => {
        console.error('Probleem gedetecteerd:', error);
    });
}