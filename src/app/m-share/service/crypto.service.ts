import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  encodedBase64Key = 'bXVzdGJlMTZieXRlc2tleQ==';

  constructor() { }

  public encrypt(textToEncrypt): string {
    const parsedBase64Key = CryptoJS.enc.Base64.parse(this.encodedBase64Key);
    let encryptedData = null;

    // Encryption process
    const plaintText = textToEncrypt;
    // console.log( 'plaintText = ' + plaintText );
    // this is Base64-encoded encrypted data
    encryptedData = CryptoJS.AES.encrypt(plaintText, parsedBase64Key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    // console.log('encryptedData = ' + encryptedData);
    return encryptedData;
  }

  public decrypt(textEncrypt): string {
     // console.log('crypto-js', CryptoJS);
    const parsedBase64Key = CryptoJS.enc.Base64.parse(this.encodedBase64Key);

    // Decryption process
    const encryptedCipherText = textEncrypt; // or encryptedData or Text was encrypt alrady;
    const decryptedData = CryptoJS.AES.decrypt(encryptedCipherText, parsedBase64Key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    // console.log( 'DecryptedData = ' + decryptedData );
    // this is the decrypted data as a string
    const decryptedText = decryptedData.toString(CryptoJS.enc.Utf8);
    // console.log('DecryptedText = ' + decryptedText);
    return decryptedText;
  }
}
