
import gallery from './gallery-items.js';
console.log(gallery);

const refs = {
  galleryContainer: document.querySelector('.js-gallery'),
  lightBoxImage: document.querySelector('.lightbox__image'),
  lightBox: document.querySelector('.lightbox'),
  lightBoxButton: document.querySelector('.lightbox__button'),
  lightBoxOverlay: document.querySelector('.lightbox__overlay'),
}

refs.galleryContainer.addEventListener('click', onClickImage);
refs.lightBoxButton.addEventListener('click', onCloseModal);
refs.lightBoxOverlay.addEventListener('click', onClickOverlay);

let currentIndex = 0;

const galleryImages = gallery.map(({ preview, original, description }, index) => 
  `<li class="gallery__item">
      <a 
        class="gallery__link" 
        href="${original}"
      >
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
        data-index="${index}"
      />
      </a>
    </li>`
);

refs.galleryContainer.insertAdjacentHTML('afterbegin', galleryImages.join(''));

function onClickImage(evt) {
  window.addEventListener('keydown',  onEscKeyPress);
  window.addEventListener('keydown', onPressArrow);
  evt.preventDefault();

  if (evt.target.nodeName === 'IMG') {
    refs.lightBox.classList.add('is-open');
    refs.lightBoxImage.src = evt.target.dataset.source;
    refs.lightBoxImage.alt = evt.target.alt;
    currentIndex = Number(evt.target.dataset.index);
  }
} 

function onCloseModal(evt) {
  window.removeEventListener('keydown', onEscKeyPress);
  window.removeEventListener('keydown', onPressArrow);
  
  refs.lightBox.classList.remove('is-open');
  refs.lightBoxImage.removeAttribute('src');
  refs.lightBoxImage.removeAttribute("alt");
}

function onClickOverlay(evt) {
  if(evt.currentTarget === evt.target) {
    onCloseModal()
  }
}

function onEscKeyPress(evt) {
  if (evt.code === 'Escape') {
    onCloseModal();
  }
}

function onPressArrow (evt) {
  if (evt.key === 'ArrowLeft') {
    onPressArrowLeft()
  } 
  else if(evt.key === 'ArrowRight') {
    onPressArrowRight()
  } 
}

function onPressArrowRight() {
  if (currentIndex < gallery.length - 1 ) {
    currentIndex +=1;
  } else {
    currentIndex = 0
  }
  refs.lightBoxImage.src = gallery[currentIndex].original;
  refs.lightBoxImage.alt = gallery[currentIndex].description;
 }

function onPressArrowLeft() {
    
    if (currentIndex - 1 < 0) {
        currentIndex = gallery.length - 1;
    } else {
        currentIndex -= 1
    }
    refs.lightBoxImage.src = gallery[currentIndex].original;
    refs.lightBoxImage.alt = gallery[currentIndex].description;
}

