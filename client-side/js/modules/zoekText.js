import { fetchData } from './fetchData.js';

export function zoekText() {

  let zoekWaarde = document.querySelector('header input').value
  if (zoekWaarde.length > 2 && zoekWaarde != '') {
    fetchData(zoekWaarde)
  } else if (zoekWaarde.length < 2) {
    fetchData('Rembrandt')
  }

}

document.querySelector('header input').addEventListener('keyup', zoekText)

