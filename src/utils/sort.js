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

const sortByDisplay = sortKey('display');

/**
 * Natural sort by Name.
 *
 * @return {Function}
 */
export const sortByName = sortKey('Name');

export const sortFiles = xs => {
  const folders = xs.filter(x => x.isFolder);
  const files = xs.filter(x => ! x.isFolder);
  return [
    ...folders.sort(sortByDisplay),
    ...files.sort(sortByDisplay),
  ];
};
