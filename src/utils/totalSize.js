/**
 * Calculate the total size of files.
 *
 * @type {Array}
 */
export default files => files
  .reduce((previous, current) =>
    previous + current.size, 0
  );
