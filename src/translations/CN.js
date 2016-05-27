export default {
  SETTINGS: {
    SIGN_OUT: '登出',
  },
  BUCKET: {
    DELETE_DESCRIPTION: 'S3 Portal 的 bucket 是唯一的。如果你删除此 bucket，其他 S3 的使用者可能会使用此名称。',
    DELETE_TYPE_NAME: '请输入 bucket 名称以确认删除。',
    DELETE_ERROR_MESSAGE: '请输入欲删除的完整 bucket 名称。',
    DELETE_CONFIRM: `删除此 bucket 及此 bucket 内的所有文件与文件夹
    （若有支援旧版本则包含旧版本）<b>会无法复原</b>。
    你确认要删除 <b>{{ name }}</b> 吗？`,
  },
};
