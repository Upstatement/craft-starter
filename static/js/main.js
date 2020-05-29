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
});
