import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import ICanvasConfig from './models/ICanvasConfig';
import { Socket, io } from 'socket.io-client';

const URL = 'http://localhost:5000';
const CONFIG_CHANGE = 'configChange'

@Injectable({
  providedIn: 'root'
})
export class ScrachpadService {
  socket: Socket;
  defaultState = { selectedColor: 'black', tool: 'pencil', strokeSize: 1, clear: false }
  private canvasConfig = new BehaviorSubject<ICanvasConfig>(this.defaultState)

  constructor() {
    this.socket = io(URL);
    this.socket.on(CONFIG_CHANGE, (state) => this.canvasConfig.next(state))
  }


  public getSocketInstance = (): Socket => this.socket;
  public getCanvasConfig = (): BehaviorSubject<ICanvasConfig> => this.canvasConfig;
  public getConfigValue = (): ICanvasConfig => this.canvasConfig.value;

  public setcanvasConfig(state: ICanvasConfig) : void {
    this.canvasConfig.next(state);
    this.socket.emit(CONFIG_CHANGE, state);
  }

  public resetDefaultState(): void {
    this.canvasConfig.next(this.defaultState);
    this.socket.emit(CONFIG_CHANGE, this.defaultState);
  }
}
