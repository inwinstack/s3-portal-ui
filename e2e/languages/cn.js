function Translate(){
  this.languages = null;
}

Translate.prototype.get = function(term){
  this.languages = languages[term];
  return this.languages
}

const languages = {
  // UTILS
  'UTILS_LOADING': '载入中...',
  'UTILS_NAME': '名称',
  'UTILS_CANCEL': '取消',
  'UTILS_CREATE': '创建',
  'UTILS_UPLOAD': '上传',
  'UTILS_OPEN': '开启',
  'UTILS_DOWNLOAD': '下载',
  'UTILS_DELETE': '删除',
  'UTILS_REFRESH': '刷新',
  'UTILS_OR': '或',
  'UTILS_CONFIRM': '确定',
  // VALIDATION
  'VALIDATION_REQUIRED': '此栏位不得为空。',
  'VALIDATION_EMAIL': '此栏位必须符合电邮格式。',
  'VALIDATION_MIN_LENGTH': /^此栏位不得小于.*个字元。$/,
  'VALIDATION_MAX_LENGTH': /^此栏位不得大于.*个字元。$/,
  'VALIDATION_MATCH': '请输入与前一个栏位相同的值。',
  // SETTINGS
  'SETTINGS_ACCOUNT': '我的帐户',
  'SETTINGS_BILLING': '付款与费用管理',
  'SETTINGS_SECURITY': '安全凭证',
  'SETTINGS_SIGN_OUT': '登出',
  'SETTINGS_SIGN_OUT_CONFIRM_TITLE': '你确定要停止所有上传并登出吗？',
  'SETTINGS_SIGN_OUT_CONFIRM_MESSAGE': '你有正在进行的操作或上传档案，若离开会将它们全部取消。确定要离开吗？',
  'SETTINGS_LEAVE': '离开',
  'SETTINGS_STAY': '留下',
  // BUCKET
  'BUCKET_EMPTY_MESSAGE': '看来你目前没有任何的 Bucket',
  'BUCKET_CREATE_MESSAGE': '别担心，建立一个是很容易的',
  'BUCKET_ERROR_MESSAGE': '糟糕，您的连线中断了⋯⋯',
  'BUCKET_REFRESH_MESSAGE': '别担心，你可以再试着刷新。',
  'BUCKET_DUPLICATE_MESSAGE': '此 bucket 已存在！请选择一个不同的名称并再试一次。',
  'BUCKET_CREATE': '创建 BUCKET',
  'BUCKET_CREATE_2': '创建 Bucket',
  'BUCKET_DELETE': '删除 Bucket',
  'BUCKET_NAME': 'Bucket 名称',
  'BUCKET_CREATE_DESCRIPTION': '你所使用的名称不得重复于 S3 Portal 中已存在的 bucket 名称。',
  'BUCKET_DELETE_DESCRIPTION': 'S3 Portal 的 bucket 是唯一的。如果你删除此 bucket，其他 S3 的使用者可能会使用此名称。',
  'BUCKET_DELETE_TYPE_NAME': '请输入 bucket 名称以确认删除。',
  'BUCKET_DELETE_ERROR_MESSAGE': '请输入欲删除的完整 bucket 名称。',
  'BUCKET_DELETE_CONFIRM': /^删除此 bucket 及此 bucket 内的所有文件与文件夹 （若有支援旧版本则包含旧版本）会无法复原。 你确认要删除.*吗?$/,
  // ACTION_NAVBAR
  'ACTION_NAVBAR_ACTIONS': '操作',
  'ACTION_NAVBAR_PROPERTIES': '属性',
  'ACTION_NAVBAR_TRANSFERS': '传输',
  'ACTION_NAVBAR_NONE': '无',
  // TOAST
  'TOAST_SIGN_IN_SUCCESS': '登入成功！',
  'TOAST_SIGN_UP_SUCCESS': '注册成功！',
  'TOAST_SIGN_OUT_SUCCESS': '登出成功！',
  'TOAST_SIGN_OUT_FAILURE': '登出失敗！',
  'TOAST_CREATE_BUCKET_SUCCESS': /^Bucket.*已创建成功！$/,
  'TOAST_CREATE_BUCKET_FAILURE': /^Bucket.*创建失敗，请再试一次！$/,
  'TOAST_DELETE_BUCKET_SUCCESS': /^Bucket.*删除成功!$/,
  'TOAST_RESET_PASSWORD_SUCCESS': /^.*更改密码成功!$/,
  'TOAST_DELETE_ACCOUNT_SUCCESS': /^.* 删除成功!$/,
  'TOAST_DELETE_ACCOUNT_FAIL': /^.* 删除失败，请再试一次!$/,
  'TOAST_CREATE_FOLDER_SUCCESS': /^资料夹.*建立成功！$/,
  'TOAST_CREATE_FOLDER_FAIL': /^资料夹.* 建立失败，请再试一次！$/,
  // AUTH
  'AUTH_EMAIL': '电邮',
  'AUTH_PASSWORD': '密码',
  'AUTH_RETYPE_PASSWORD': '再次输入密码',
  'AUTH_SIGN_IN': '登入',
  'AUTH_SIGN_UP': '注册',
  'AUTH_HAVE_ACCOUNT': '已经有帐户了吗？',
  'AUTH_HAVE_NOT_ACCOUNT': '尚未注册帐戶吗？',
  'AUTH_CREATE_ACCOUNT': '创建帐户',
  'AUTH_LOGIN_TO_YOUR_ACCOUNT': '登入你的帐户',
  'AUTH_ALREADY_EXIST': '已有其他人使用这个电邮，请换一个试试',
  'AUTH_SIGN_IN_INCORRECT': '你的电邮或密码不正确，请再试一次。',
  'ADMIN_CREATE_ACCOUNT': '新增使用者',
  // TRANSFER
  'TRANSFER_AUTO_CLEAR': '自动清除已完成传输',
  'TRANSFER_TITLE_UPLOAD': /^上传 .* 至 .*$/,
  'TRANSFER_TITLE_DELETE': /^從 .* 删除 .*$/,
  'TRANSFER_STATUS_DELETING': '删除中',
  'TRANSFER_STATUS_DELETED': '已删除',
  'TRANSFER_STATUS_UPLOADING': '上传中',
  'TRANSFER_STATUS_COMPLETED': '已完成',
  'TRANSFER_STATUS_RESUMING': '重新开始',
  'TRANSFER_CANCEL_UPLOAD': /^.*的上传已被取消$/,
  'TRANSFER_CANCEL_TITLE': '你确定要取消这项上传吗?',
  'TRANSFER_CANCEL_DESCRIPTION': '取消上传将无法复原，你确定要这样做吗?',
  'TRANSFER_CANCELED': '取消传输',
  // FILE
  'FILE_CREATE_FOLDER': '创建文件夹',
  'FILE_STORAGE_CLASS': '储存类型',
  'FILE_SIZE': '容量大小',
  'FILE_LAST_MODIFIED': '最后修改时间',
  'FILE_OWNER': '拥有者',
  'FILE_NAME': '文件名',
  'FILE_DO_ACTIONS': '你可以执行以下操作',
  'FILE_UPLOAD': '上传档案',
  'FILE_EMPTY_BUCKET': '这个 bucket 是空的',
  'FILE_EMPTY_FOLDER': '这个文件夹是空的',
  'FILE_UPLOAD_DESCRIPTION': '点击新增档案以上传文件至 S3 Portal。点击文件名称右侧的 ✖ 可以清除以选择的文件。',
  'FILE_ADD': '新增文件',
  'FILE_NUMBER_OF': '档案总数：',
  'FILE_TOTAL_SIZE': '总上传容量大小：',
  'FILE_FOLDER_NAME': '文件夹名称',
  'FILE_FOLDER_DUPLICATED_MESSAGE': '此文件夹已存在！请选择一个不同的名称并再试一次。',
  'FILE_NEW_FOLDER': '新文件夾',
  'FILE_UPLOAD_SUCCESS_MESSAGE': /^档案.*上传成功!$/,
  'FILE_DELETE_SUCCESS_MESSAGE': /^.*删除成功！$/,
  // RENAME
  'RENAME_TITLE': '重新命名',
  'RENAME_DESCRIPTION': '您确定要修改这个物件的名称吗?',
  'RENAME_ITEM_NAME': '物件名称',
  'RENAME_NEW_NAME': '新名称',
  'RENAME_SUCCESS': /^档案.*重新命名成功$/,
  'RENAME_FAILURE': /^档案.*重新命名失败，请再试一次!$/,
  // MANAGER
  'MANAGER_USER_LIST': '使用者列表',
  'MANAGER_CREATE_USER': '新增使用者',
  'MANAGER_USER_DELETE': '删除使用者',
  'MANAGER_USER_ACCOUNT': '账号',
  'MANAGER_USER_ROLE': '权限',
  'MANAGER_USER_REGISTER_TIME': '注册时间',
  'MANAGER_USER_RESET': '重新设定密码',
  'MANAGER_SEARCH': '搜寻',
  'MANAGER_DELETE_TITLE': '删除使用者',
  'MANAGER_DELETE_EMAIL': '使用者 Email',
  'MANAGER_DELETE_TYPE_NAME': '请输入 Email 以确认删除。',
  'MANAGER_DELETE_ERROR_MESSAGE': '请输入欲删除的完整 Email。',
  'MANAGER_DELETE_CONFIRM': /^删除此 Account 及此 Account 内的所有 Bucket （若有支持旧版本则包含旧版本）会无法复原。 你确认要删除 .* 吗？$/,
  //MOVE
  'UTILS_MOVE': '移动',
  'MOVE_TITLE': '移动',
  'MOVE_DESCRIPTION': '选择移动的目的地资料夹',
  'MOVE_SELECTED_ITEMS': 'Selected Items',
  'MOVE_FOIDER': 'My Folders',
  'TOAST_MOVE_SUCCESSFULLY': '档案 ab.png 移动档案成功',
  'TOAST_MOVE_FAILURE' : '档案 ab.png 移动档案失败，请再试一次!',
  'TOAST_MOVE_FOLDER_SUCCESSFULLY': '档案移动档案成功',
  //MAKECOPY
  'UTILS_MOVE': '製作副本',
  'REPLICATE_DESCRIPTION': '您要将所选项目制作副本吗？',
  'REPLICATE_CANCEL': '取消',
  'REPLICATE_CONFIRM': '确定',
  'TOAST_REPLICATE_SUCCESSFULLY': '製作副本成功!',
}

module.exports = Translate;
