
/*!
 * select
 *
 * MIT
 */

/**
 * Exports.
 */

module.exports = select;

/**
 * Selection timeout.
 */

var selectionTimeout;

/**
 * Create a text range selection on `input`
 * from `start` to `end`.
 *
 * @param {Element} input
 * @param {Number} [start]
 * @param {Number} [end]
 * @api public
 */

function select (input, start, end) {
  input.focus();

  var value = input.value;
  var length = value.length;

  // behave a bit like .slice
  switch (arguments.length) {
    case 1:
      start = 0;
    case 2:
      end = length;
    break
  }

  // selecting the text needs to happen in a new tick... :(
  // https://code.google.com/p/chromium/issues/detail?id=32865
  // http://stackoverflow.com/questions/11723420/chrome-setselectionrange-not-work-in-oninput-handler
  clearTimeout(selectionTimeout);
  selectionTimeout = setTimeout(function(){
    if (input.createTextRange) {
      // use text ranges for Internet Explorer
      var range = input.createTextRange();
      range.moveStart('character', start);
      range.moveEnd('character', end - start);
      range.select();
    }
    else if (input.setSelectionRange) {
      // use setSelectionRange() for Mozilla/WebKit
      input.setSelectionRange(start, end);
    }

    // set focus back to the input el
    input.focus();
  }, 0);
};
