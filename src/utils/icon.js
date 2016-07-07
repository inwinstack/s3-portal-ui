const icons = [
  ['/', 'folder'],
];

export default name => {
  const index = icons.findIndex(icon => name.endsWith(icon[0]));
  return (index === -1) ? 'insert_drive_file' : icons[index][1];
};
