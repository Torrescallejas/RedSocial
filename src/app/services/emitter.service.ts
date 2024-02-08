import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmitterService {

  private estado:Boolean = false;

  private _estado: BehaviorSubject<any>;


  constructor() {
    this._estado = new BehaviorSubject<any>(false);
  }

  get estados() {
    return this._estado.asObservable();
  }

  changeBool(bool: Boolean) {
    this.estado = bool;
    this._estado.next(this.estado);
  }

}
