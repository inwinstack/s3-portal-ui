export default {
  SETTINGS: {
    SIGN_OUT: 'Sign Out',
  },
  TRANSFER: {
    TITLE: {
      UPLOAD: 'Upload {{ name }} to {{ bucket }}',
      DELETE: 'Delete {{ name }} from {{ bucket }}',
    },
    STATUS: {
      UPLOADING: 'Uploading',
      COMPLETED: 'Completed',
      DELETE: 'Deleted',
      RESUMING: 'Resuming',
    },
  },
  BUCKET: {
    DELETE_DESCRIPTION: `The buckets in S3 Portal are unique.
    If you delete this bucket, you may lose the bucket name to another S3 user.`,
    DELETE_TYPE_NAME: 'Type the name of the bucket to confirm deletion:',
    DELETE_ERROR_MESSAGE: 'Type the exact name of the bucket you are trying to delete.',
    DELETE_CONFIRM: `Deleting this bucket and its objects (
    including older versions if applicable) <b>cannot be undone</b>.
    Are you sure you want to delete <b>{{ name }}</b>?`,
  },
};
