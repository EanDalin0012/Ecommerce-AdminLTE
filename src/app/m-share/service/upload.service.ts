import { Injectable } from '@angular/core';
import { Base64WriteImage } from '../model/base64-write-image';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { CryptoService } from './crypto.service';
import { ResponseStatus } from '../constants/common.const';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
    private httpClient: HttpClient,
    private httpService: HttpService,
    private cryptoService: CryptoService
  ) { }

  public upload(fileInfo: Base64WriteImage): Promise<boolean> {
    return new Promise(resolve => {
      if (fileInfo) {
        const api = '/api/base64/image/v1/write';
        const data = new Base64WriteImage();
        data.base64          = fileInfo.base64;
        data.fileName       = fileInfo.fileName;
        data.fileSize       = fileInfo.fileSize;
        data.fileType       = fileInfo.fileType;
        data.fileExtension  = fileInfo.fileExtension;
        data.id              = fileInfo.id;

        const dataBody = JSON.stringify(fileInfo);
        console.log('data', dataBody);
        const encryptionData = this.cryptoService.encrypt(dataBody);
        this.httpService.Post(api, data).then(resp => {
          if ( resp && resp.status === ResponseStatus.Y) {
              resolve(true);
          } else {
            resolve(false);
          }
        });
      }
    });
  }

}
