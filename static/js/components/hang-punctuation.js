class HangPunctuation {
  constructor() {
    this.containers = Array.from(document.querySelectorAll('.js-hang-punc'));
    this.punctuationMarks = {
      '\u201c': 'medium', // “ - ldquo - left smart double quote
      '\u2018': 'small', // ‘ - lsquo - left smart single quote
      '\u0022': 'medium', // " - ldquo - left dumb double quote
      '\u0027': 'small', // ' - lsquo - left dumb single quote
      '\u00AB': 'large', // « - laquo - left double angle quote
      '\u2039': 'medium', // ‹ - lsaquo - left single angle quote
      '\u201E': 'medium', // „ - bdquo - left smart double low quote
      '\u201A': 'small', // ‚ - sbquo - left smart single low quote
    };

    if (this.containers.length > 0) {
      this.containers.forEach(this.hangPunc.bind(this));
    }
  }

  hangPunc(container) {
    const containerChildren = container.childNodes;

    // Loop over all direct descendants of the $container
    // If it's a blockquote, loop over its direct descendants
    for (let i = 0; i < containerChildren.length; i += 1) {
      const el = containerChildren[i];

      for (let k = 0; k < el.childNodes.length; k += 1) {
        this.hangIfEligible(el.childNodes[k]);
      }
    }
  }

  hangIfEligible(el) {
    const text = el.innerText || el.textContent;

    let htmlClass = 'hang-punc-';

    const marks = Object.keys(this.punctuationMarks);
    marks.forEach(mark => {
      if (text.indexOf(mark) === 0) {
        if (
          el.tagName === 'H1' ||
          el.tagName === 'H2' ||
          el.tagName === 'H3' ||
          el.tagName === 'H4' ||
          el.tagName === 'H5'
        ) {
          htmlClass += 'header-';
        }
        el.classList.add(htmlClass + this.punctuationMarks[mark]);
      }
    });
  }
}

export default HangPunctuation;
