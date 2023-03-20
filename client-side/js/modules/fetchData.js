import { checkForHash } from "./checkForHash.js";
import { createListItem } from "./createListItem.js";

export function fetchData(query = 'Rembrandt') {

  let parent = document.querySelector('section ul');

  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }

  const artContainer = document.querySelector('main > section:nth-of-type(2)')

  const urlApi = 'https://www.rijksmuseum.nl/api/nl/collection'
  const apiKey = 'BQfKnS2c'
  const ifImage = "imgonly=true";
  const sortedBy = "relevance";
  const resultAmount = "ps=20";

  // String Interpolatie doormiddel van backticks
  // Expressions zijn wrapped in ${}
  const url = `${urlApi}/?key=${apiKey}&q=${query}&${resultAmount}&${ifImage}&s=${sortedBy}`;

  document.querySelector('section:nth-of-type(4) > p').style.display = 'none';

  // return Om Error state te testen.

  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {

      // Empty state
      if (data.artObjects.length <= 1) {
        document.querySelector('section:nth-of-type(4) > p').style.display = 'flex';
        return;
      }

      // Images filteren die een image hebben en map roept het createListItem aan 
      const listItems = data.artObjects.filter(aObject => aObject.hasImage).map(aObject => createListItem(aObject));

      // Append de list items aan het parent element
      // We gebruiken de spread operator om van de array met nodes, losse nodes te maken om
      // gebruik te kunnen maken van de append method
      parent.append(...listItems);

      artContainer.textContent = "";
    })
    .catch(error => {
      console.error('Probleem gedetecteerd:', error);
    });
  checkForHash();
}

