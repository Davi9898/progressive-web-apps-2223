import { fillObjectModal } from "./fillObjectModal.js";


export function createListItem(aObject) {

  let li = document.createElement("li");
  let image = document.createElement("img");

  const urlApi = 'https://www.rijksmuseum.nl/api/nl/collection'
  const apiKey = 'BQfKnS2c'

  //Fetch afbeelding data

  const afbeeldingen = `${urlApi}/${aObject.objectNumber}/tiles?key=${apiKey}`;

  fetch(afbeeldingen)
    .then(response => {
      return response.json();
    })
    .then(images => {

      var mobileLevelIndex = 0;

      images.levels.forEach((level, index) => {
        if (level.width <= 750 && level.width > 250) {
          if (images.levels[index].tiles.length == 1) {
            mobileLevelIndex = index;

          }
        }
      })
      image.src = images.levels[mobileLevelIndex].tiles[0].url
    })
    .catch(error => {
      console.error('Probleem gedetecteerd:', error);
    });

  image.setAttribute('rijksobject-nummer', aObject.objectNumber);

  li.addEventListener('click', () => {
    fillObjectModal(aObject.objectNumber);
  })
  li.appendChild(image);
  return li;
}



