class ToggleGrid {
  constructor() {
    this.initialize();
  }

  initialize() {
    document.onkeydown = e => {
      // Press 0 to toggle the grid
      if (e.keyCode === 48) {
        document.body.classList.toggle('show-grid');
      }
    };
  }
}

export default ToggleGrid;
