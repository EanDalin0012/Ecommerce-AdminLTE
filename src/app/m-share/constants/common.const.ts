import { MaritalStatus } from "../model/marital-status";

export enum ModalStoreKey {
  ModalStoreKey = 'Modal_Store_object_dialog'
}

export enum ButtonRoles {
  close     = 'CLOSE',
  edit      = 'EDIT',
  save      = 'SAVE',
  delete    = 'DELETE',
  active    = 'ACTIVE'

}

export enum Language {
  // EN = '01',      // english
  // KM = '02',      // khmer
  // KO = '03',      // korean
  // JA = '04',      // japanese
  // ZH = '05',      // chines
  I18N_EN = 'en',
  I18N_KM = 'km',
  I18N_KO = 'ko',
  I18N_JA = 'ja',
  I18N_ZH = 'zh'
}

export enum LocalStorage {
  DeviceInfo        = 'deviceInfo',
  networkIP         = 'networkIP',
  CONTENTS_VERSION  = 'contentsVersion',
  PRE_TRANSACTION   = 'preTransaction',
  USER_INFO         = 'userInfo',
  IS_REMEMBER_ID    = 'isRememberId',
  USER_ID           = 'userID',
  LANGUAGE_CODE     = 'languageCode',
  I18N              = 'i18n',
  LAST_EVENT_TIME   = 'lastEventTime',
  LAST_TIME_CHECK_NOTIFICATION = 'theLastTimeCheckNotification',
  Authorization   = 'Authorization'
}

// TODO: auth.service will be update this code.
export enum AESInfo {
  store = 'AES_INFO'
}

export enum UrlCode {
  'category'            = 'category',
  'vendor'              = 'vendor',
  'product'             = 'product',
  'componentInput'      = '',
  'adminDashboard'      = 'index',
  'user'                = 'user',
  'user-role'           = 'user-role',
  'user-account'        = 'user-account'

}

export enum ResponseStatus {
  Y = 'Y',
  N = 'N'
}

export const maritalStatus: MaritalStatus[] = [
  {
    text: 'Single',
    code: 'S'
  },
  {
    text: 'Married',
    code: 'M'
  },
  {
    text: 'Widowed',
    code: 'W'
  },
  {
    text: 'Divorced',
    code: 'D'
  }
];

export const gender = [
  {
    text: 'Male',
    code: 'M'
  },
  {
    text: 'Female',
    code: 'F'
  },
  {
    text: 'Other',
    code: 'O'
  },
];

