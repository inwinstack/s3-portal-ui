export default {
  SETTINGS: {
    SIGN_OUT: '登出',
  },
  BUCKET: {
    DELETE_DESCRIPTION: 'S3 Portal 的 bucket 是唯一的。如果你刪除此 bucket，其他 S3 的使用者可能會使用此名稱。',
    DELETE_TYPE_NAME: '請輸入 bucket 名稱以確認刪除。',
    DELETE_ERROR_MESSAGE: '請輸入欲刪除的完整 bucket 名稱。',
    DELETE_CONFIRM: `刪除此 bucket 及此 bucket 內的所有檔案與資料夾
    （若有支援舊版本則包含舊版本）<b>會無法復原</b>。
    你確認要刪除 <b>{{ name }}</b> 嗎？`,
  },
};
