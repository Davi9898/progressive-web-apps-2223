export function hideModal() {
  let modal = document.querySelector('.details');
  modal.classList.add('hidden');
  modal.querySelector('section:nth-of-type(3) article img').src = '';
}


