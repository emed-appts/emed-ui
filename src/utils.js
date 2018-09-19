/**
 * @param {string} s - an ISO 8001 format date and time string
 *                      with at least year-month components, e.g. 2015-11-24T19:40:00
 * @returns {Date} - Date instance from parsing the string. May be NaN.
 */
function parseISOLocal(s) {
  var b = s.split(/\D/);
  // fill up missing parts
  // for (let i = b.length; i < 6; i++) {
  //   b[i] = "0";
  // }
  return new Date(b[0], b[1] - 1, b[2] || 1, b[3] || 0, b[4] || 0, b[5] || 0);
}

/**
 * ascending date comparator
 *
 * @param {string} a - an ISO 8601 format date and time string
 * @param {string} b - an ISO 8601 format date and time string
 * @returns {int} - -1 if a < b; 1 if a > b; otherwise 0
 */
function dateCompareFn(a, b) {
  let aTime = parseISOLocal(a);
  let bTime = parseISOLocal(b);
  if (aTime < bTime) return -1;
  if (aTime > bTime) return 1;
  return 0;
}

/**
 * compares the dates w/o respecting time
 *
 * @param {Date} a - a date object
 * @param {Date} b - a date object
 * @returns {boolean} - true if date equals w/o time
 */
function equalDate(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default {
  parseISOLocal,
  dateCompareFn,
  equalDate
};
