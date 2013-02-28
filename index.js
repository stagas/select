
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
 * Create a text range selection on `input`
 * from `start` to `end`.
 *
 * @param {Element} input
 * @param {Number} [start]
 * @param {Number} [end]
 * @api public
 */

function select (input, start, end) {
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

  if (input.createTextRange) {
    // use text ranges for Internet Explorer
    var range = input.createTextRange();
    range.moveStart('character', start);
    range.moveEnd('character', end - length);
    range.select();
  }
  else if (input.setSelectionRange) {
    // use setSelectionRange() for Mozilla/WebKit
    input.setSelectionRange(start, end);
  }
};
