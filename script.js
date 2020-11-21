
let openButton = document.querySelector('.profile__pencil');
openButton.addEventListener("click", showPopap);
function showPopap() {
  let popap = document.querySelector('.popap');
  popap.classList.add('popap_opened');
}

let closeButton = document.querySelector('.popap__close-ico');
closeButton.addEventListener('click', hidePopap)
function hidePopap() {
  let popap = document.querySelector('.popap');
  popap.classList.remove('popap_opened');
}
