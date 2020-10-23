import $ from 'jquery';

// Components
import Menu from './components/menu';
import ToggleGrid from './components/toggle-grid';
import Links from './components/links';

$(() => {
  // Magic goes here
  new Links();

  if ($('.js--menu')) {
    new Menu();
  }

  if (process.env.NODE_ENV === 'development') {
    new ToggleGrid();
  }

  if ($('.js-modal-gallery')) {
    import(/* webpackChunkName: "modal-gallery" */ './components/modal-gallery').then(module => {
      const ModalGallery = module.default;
      new ModalGallery();
    });
  }

  if ($('.wp-block-table')) {
    import(/* webpackChunkName: "hang-punctuation" */ './components/tables').then(module => {
      const Tables = module.default;
      new Tables();
    });
  }

  if ($('.js-hang-punc')) {
    import(/* webpackChunkName: "hang-punctuation" */ './components/hang-punctuation').then(
      module => {
        const HangPunctuation = module.default;
        new HangPunctuation();
      },
    );
  }

  const lazyImages = [].slice.call(document.querySelectorAll('img.lazy-img'));
  if ('IntersectionObserver' in window) {
    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove('lazy');
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Possibly fall back to a more compatible method here
  }
});
