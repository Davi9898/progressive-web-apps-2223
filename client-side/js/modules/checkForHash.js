import { fillObjectModal } from "./fillObjectModal.js";
import { hideModal } from "./hideModal.js";

export function checkForHash() { // CHATGPT
  if (location.hash != '') { // De waarde wordt uitgelezen 
    fillObjectModal(location.hash.split('#')[1]); // [1] = ObjectID Alles na het hekje door split
    return;
  }
  hideModal();
}



