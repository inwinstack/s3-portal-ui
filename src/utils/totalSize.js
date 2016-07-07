/**
 * Calculate the total size of files.
 *
 * @type {Array}
 */
export default files => files
  .reduce((previous, current) =>
    previous + current.detail.size, 0
  );
