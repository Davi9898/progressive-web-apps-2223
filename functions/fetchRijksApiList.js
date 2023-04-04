import fetch from 'node-fetch';

export function fetchRijksApiList(query = 'vermeer') {

const urlApi = 'https://www.rijksmuseum.nl/api/nl/collection'
const apiKey = 'BQfKnS2c'
const ifImage = "imgonly=true";
const sortedBy = "relevance";
const resultAmount = "ps=20";

// String Interpolatie doormiddel van backticks
// Expressions zijn wrapped in ${}
const url = `${urlApi}/?key=${apiKey}&q=${query}&${resultAmount}&${ifImage}&s=${sortedBy}`;

// return Om Error state te testen.

return fetch(url)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log('es')
        //data.artObjects.length <= 1
        // Images filteren die een image hebben en map roept het createListItem aan 
        return data.artObjects.filter(aObject => aObject.hasImage).map(aObject => {
            aObject.webImage.url = aObject.webImage.url.slice(0, -1) + "300"
            return aObject;
        });
    })
    .catch(error => {
        console.error('Probleem gedetecteerd:', error);
    });
}