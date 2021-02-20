import { LocalStorage } from './../constants/common.const';
export abstract class Utils {

    public static getUserInfo(): any {
      return  JSON.parse(window.localStorage.getItem(LocalStorage.USER_INFO));
    }

    public static setSecureStorage( sKey: string, oValue: any ) {
      oValue = this.stringjson(oValue);
      window.localStorage.setItem(sKey, oValue);
    }

    static stringjson(oValue: any): any {
      const value =  oValue !== undefined && oValue !== null ? JSON.stringify(oValue) : '';
      return value;
    }

    public static getSecureStorage( sKey: string ): any {
      let language = window.localStorage.getItem(sKey);
      language = this.parsejson(language);
      return language;
    }

    static parsejson(data): any {
      let retValue;
      if ( data !== undefined && data !== '') {
        retValue = JSON.parse(data);
      } else {
          retValue = data;
      }
      return retValue;
    }

    public static removeSecureStorage(sKey: string) {
      window.localStorage.removeItem(sKey);
    }

   // 100 - ( 15 / 100)
}
