import fetch from 'node-fetch';

export function fetchRijksApiList() {

const urlApi = 'https://www.rijksmuseum.nl/api/nl/collection'
const apiKey = 'BQfKnS2c'
const ifImage = "imgonly=true";
const sortedBy = "relevance";
const resultAmount = "ps=20";
const query = '';

// String Interpolatie doormiddel van backticks
// Expressions zijn wrapped in ${}
const url = `${urlApi}/?key=${apiKey}&q=${query}&${resultAmount}&${ifImage}&s=${sortedBy}`;

// return Om Error state te testen.

return fetch(url)
    .then(response => {
        return response.json();
    })
    .then(data => {

        //data.artObjects.length <= 1
        // Images filteren die een image hebben en map roept het createListItem aan 
        return data.artObjects.filter(aObject => aObject.hasImage);
        
    })
    .catch(error => {
        console.error('Probleem gedetecteerd:', error);
    });
}