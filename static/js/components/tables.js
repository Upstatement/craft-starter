class Tables {
  constructor() {
    this.tables = document.querySelectorAll('.wp-block-table');

    if (this.tables.length) {
      this.setUpResponsiveTables();
    }
  }

  setUpResponsiveTables() {
    this.tables.forEach(tableEl => {
      const tableArr = [];
      const headerCells = tableEl.querySelectorAll('thead th, thead td');
      const bodyRows = tableEl.querySelectorAll('tbody tr');

      if (headerCells.length) {
        this.getHeaderContent(tableArr, headerCells);
        this.setTableDataAtts(bodyRows, tableArr);
      }
    });
  }

  /**
   * Loop through given table head cells and pushes text content to given array
   */
  getHeaderContent(tableArr, headerCells) {
    for (let i = 0; i < headerCells.length; i++) {
      tableArr.push(headerCells[i].textContent);
    }
  }

  /**
   * Loop through table body to set table head text content and cell wrapper for mobile
   * header styling
   */
  setTableDataAtts(bodyRows, tableArr) {
    let children;

    for (let i = 0; i < bodyRows.length; i++) {
      children = bodyRows[i].children;

      for (let j = 0; j < children.length; j++) {
        children[j].setAttribute('data-th', tableArr[j]);
        this.wrapInner(children[j], 'span', 'cell-contents');
      }
    }
  }

  /**
   * Wraps an HTML element around the content of each parent element
   * recreating jQuery's wrapInner() function
   * @see https://api.jquery.com/wrapInner/
   *
   * @param {Node} parent element that needs to be innerwrapped
   * @param {string} wrapper specifies the type of element that will innerwrap
   * @param {string} wrapperClassName class applied to the innerwrap element
   */
  wrapInner(parent, wrapper, wrapperClassName) {
    if (typeof wrapper === 'string') {
      wrapper = document.createElement(wrapper);
    }

    parent.appendChild(wrapper);
    wrapper.classList.add(wrapperClassName);

    while (parent.firstChild !== wrapper) {
      wrapper.appendChild(parent.firstChild);
    }
  }
}

export default Tables;
