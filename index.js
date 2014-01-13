
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
  var editable = 'true' === input.contentEditable; // yes, string 'true' ..
  var target = editable ? document.body : input;
  var value = editable ? input.lastChild : input.value;
  var length = value.length;

  // behave a bit like .slice
  switch (arguments.length) {
    case 1:
      start = 0;
    case 2:
      end = length;
    break
  }

  if (target.createTextRange) {
    // use text ranges for Internet Explorer
    var range = target.createTextRange();
    if (editable) range.moveToElementText(input);
    range.moveStart('character', start);
    range.moveEnd('character', end - length);
    range.select();
  }
  else if (input.setSelectionRange) {
    // use setSelectionRange() for Mozilla/WebKit
    input.setSelectionRange(start, end);
  }
  else {
    // contentEditable selection for Mozilla/WebKit
    var selection = window.getSelection();
    var range = document.createRange();
    range.setStart(input.firstChild, start);
    range.setEnd(input.lastChild, end);
    selection.removeAllRanges();
    selection.addRange(range);
  }
};
