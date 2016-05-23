const units = [
  'bytes',
  'KB',
  'MB',
  'GB',
  'TB',
  'PB',
];

/**
 * Format file size.
 *
 * @return {String}
 */
export default () => bytes => {
  if (isNaN(parseFloat(bytes)) || ! isFinite(bytes)) {
    return '?';
  }

  let unit = 0;

  while (bytes >= 1024) {
    bytes /= 1024;
    unit ++;
  }

  return `${bytes.toFixed(2)} ${units[unit]}`;
};
