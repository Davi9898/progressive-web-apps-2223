export function fillObjectModal(aObject) { 

  //Fetch afbeelding data
  const urlApi = 'https://www.rijksmuseum.nl/api/nl/collection'
  const apiKey = 'BQfKnS2c'
  const artObjectUrl = `${urlApi}/${aObject}?key=${apiKey}`

  fetch(artObjectUrl)
    .then(response => {
      return response.json();
    })
    .then(response => {

      let modal = document.querySelector('.details');

      modal.querySelector('section:nth-of-type(3) article h2').textContent = response.artObject.longTitle;
      modal.querySelector('section:nth-of-type(3) article img').src = response.artObject.webImage.url;
      modal.querySelector('section:nth-of-type(3) article p').textContent = response.artObject.description;

      // wanneer description leeg is toon anders..
      if (!response.artObject || !response.artObject.description) {
        modal.querySelector('section:nth-of-type(3) article p').textContent = "Er is geen beschrijving voor dit kunstobject";
      } else {
        modal.querySelector('section:nth-of-type(3) article p').textContent = response.artObject.description;
      }

      // History API Method     #dataObject            N/A                     
      window.history.pushState({ objectNumber: aObject }, null, "#" + aObject);

      modal.classList.remove('hidden')

      let terugButton = document.querySelector('button')
      terugButton.addEventListener('click', () => {
        //Nieuwe state maken, empty
        history.pushState("", null, window.location.pathname + window.location.search);

        modal.classList.add('hidden');

        modal.querySelector('section:nth-of-type(3) article img').src = '';
      })
        .catch(error => {
          console.error('Probleem gedetecteerd:', error);
        });
    })
}

