import { fetchData } from './modules/fetchData.js';
import { checkForHash } from './modules/checkForHash.js';
import { zoekText } from './modules/zoekText.js';


fetchData()



document.querySelector('header input').addEventListener('keyup', zoekText)

// voegt popstate event toe aan het window object, checkForHash wordt aangeroepen
window.addEventListener('popstate', checkForHash)