import $ from 'jquery';
import SimpleLightbox from 'simple-lightbox';

class ModalGallery {
  /**
   * Creates a new modal gallery instance and mounts it.
   */
  constructor() {
    const mediaQuery = ['img', 'video']
      .map(tag => `${tag}:not(.js-modal-gallery__hidden):not(.wp-rich-text-inline-image)`)
      .join(', ');

    const media = [...$('.js-modal-gallery').find(mediaQuery)];
    const mediaFiles = media.map(item => $(item).attr('data-src'));
    const captions = media.map(item => $(item).attr('data-caption'));

    media.forEach((item, index) => {
      $(item).on('click', () => {
        SimpleLightbox.open({
          items: mediaFiles,
          captions: captions,
          startAt: index,
        });
      });
    });
  }
}

export default ModalGallery;
