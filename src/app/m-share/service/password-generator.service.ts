import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordGeneratorService {

  private checkboxes = [
    {
      id: 'lowercase',
      label: 'a-z',
      library: 'abcdefghijklmnopqrstuvwxyz',
      checked: true
    }, {
      id: 'uppercase',
      label: 'A-Z',
      library: 'ABCDEFGHIJKLMNOPWRSTUVWXYZ',
      checked: true
    }, {
      id: 'numbers',
      label: '0-9',
      library: '0123456789',
      checked: true
    }, {
      id: 'symbols',
      label: '!-?',
      library: "!@#$%^&*-_=+\\|:;',.\<>/?~",
      checked: false
    }
  ];

  private lowercase: boolean = this.checkboxes[0].checked;
  private uppercase: boolean = this.checkboxes[1].checked;
  private numbers: boolean = this.checkboxes[2].checked;
  private symbols: boolean = this.checkboxes[3].checked;
  private dictionary: Array<string>;
  constructor() { }

  public generatePassword(passwordLenght?: number): string {
    let passwordSize = 8;
    if(passwordLenght) {
      passwordSize = passwordLenght;
    }
    // Create array from chosen checkboxes
    this.dictionary = [].concat(
      this.lowercase ? this.checkboxes[0].library.split('') : [],
      this.uppercase ? this.checkboxes[1].library.split('') : [],
      this.numbers ? this.checkboxes[2].library.split('') : [],
      this.symbols ? this.checkboxes[3].library.split('') : []
    );

    // Generate random password from array
    let newPassword = '';
    for (let i = 0; i < passwordSize; i++) {
      newPassword += this.dictionary[Math.floor(Math.random() * this.dictionary.length)];
    }
    return newPassword;
  }
}
