import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public globalVar: any;

  constructor() { 
    this.globalVar = 'Initial Value';
  }

  updateGlobalVar(newValue: any): void {
    this.globalVar = newValue;
  }
}
