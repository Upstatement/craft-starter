import $ from 'jquery';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

class Menu {
  constructor() {
    this.classname = '.js--menu';

    this.body = $('body');
    this.logo = $('.nav__logo-link');
    this.menu = $(`${this.classname}`);
    this.menuToggle = $(`${this.classname}-toggle`);
    this.menuIsOpen = false;
    // Set focusable elements
    this.focusableEls = [this.logo, this.menuToggle, ...Array.from(this.menu.find('a'))];

    this.firstFocusableEl = this.focusableEls[0];
    this.lastFocusableEl = this.focusableEls[this.focusableEls.length - 1];

    this.listeners = [];

    this.bindEvents();
  }

  /**
   * Returns the classname without the starting `.`
   *
   * @example
   * this.classname = '.js--menu';
   * // this.plainClassname === 'js--menu'
   */
  get plainClassname() {
    return this.classname.replace(/^\.*/g, '');
  }

  get activeClass() {
    return `${this.plainClassname}-active`;
  }

  bindEvents() {
    this.menuToggle.click(this.toggle.bind(this));
  }

  open() {
    this.menu.removeAttr('aria-hidden');
    this.body.addClass(this.activeClass);
    this.menuIsOpen = true;
    this.menu.focus();

    // this.listeners.push(on(document, 'keydown', this.keydown.bind(this)));
    disableBodyScroll(this.menu);
  }

  close() {
    this.menu.attr('aria-hidden', true);
    this.body.removeClass(this.activeClass);
    this.menuToggle.focus();
    this.menuIsOpen = false;
    this.listeners.forEach(off => {
      off();
    });
    enableBodyScroll(this.menu);
  }

  toggle() {
    if (this.menuIsOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  handleBackwardTab(e) {
    if (document.activeElement === this.firstFocusableEl) {
      e.preventDefault();
      this.lastFocusableEl.focus();
    }
  }

  handleForwardTab(e) {
    if (document.activeElement === this.lastFocusableEl) {
      e.preventDefault();
      this.firstFocusableEl.focus();
    }
  }

  keydown(e) {
    switch (e.keyCode) {
      // Escape
      case 27: {
        this.close();
        break;
      }

      // Tab
      case 9: {
        if (this.focusableEls.length === 1) {
          e.preventDefault();
          break;
        }
        if (e.shiftKey) {
          this.handleBackwardTab(e);
        } else {
          this.handleForwardTab(e);
        }
        break;
      }

      default: {
        break;
      }
    }
  }
}

export default Menu;
