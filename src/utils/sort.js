import natural from 'javascript-natural-sort';

/**
 * Return a function that will sort by given key.
 *
 * @param  {String} x
 * @param  {String} y
 *
 * @return {Function}
 */
const sortKey = key => (x, y) => natural(x[key], y[key]);

/**
 * Natural sort by Name.
 *
 * @return {Function}
 */
export const sortByName = sortKey('Name');
