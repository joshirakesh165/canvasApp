import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ScrachpadService } from '../scrachpad.service';
import { Socket } from "socket.io-client";

const ON_MOUSE_START_EVENT = "onMouseStart";
const ON_MOUSE_MOVE_EVENT = "onMouseMove";
const ON_MOUSE_END_EVENT = "onMouseEnd";


@Component({
  selector: 'app-board',
  standalone: true,
  imports: [],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements AfterViewInit {

  @ViewChild('canvas') canvas: ElementRef;
  canvasCtx: CanvasRenderingContext2D;
  draw = false;
  tool: any;
  canvasElement: any;
  history: ImageData[] = [];
  historyIndex: number = 0;
  socket: Socket;

  constructor(private scrachpad: ScrachpadService) { }


  ngOnInit() {
    this.socket = this.scrachpad.getSocketInstance();
    this.listenSocketEvents();  
  }

  listenSocketEvents():void {
    this.socket.on(ON_MOUSE_START_EVENT, (x, y) => this.startDraw(x, y));
    this.socket.on(ON_MOUSE_MOVE_EVENT, (x, y) => this.drawLine(x, y));
    this.socket.on(ON_MOUSE_END_EVENT, () => this.stopDraw());
  }

  ngAfterViewInit(): void {
    this.canvasElement = this.canvas.nativeElement
    this.canvasElement.width = window.innerWidth
    this.canvasElement.height = window.innerHeight
    this.canvasCtx = this.canvasElement.getContext("2d");

    this.scrachpad.getCanvasConfig().subscribe(state => {
      this.canvasCtx.strokeStyle = state.selectedColor;
      this.canvasCtx.lineWidth = state.strokeSize;
      this.tool = state.tool;
      if (state.clear) {
        this.clearCanvas();
      } else if (state.tool == 'undo') {
        this.undo();
      } else if (state.tool == 'redo') {
        this.redo();
      }
    })

  }

  private startDraw(x: number, y: number) {
    this.draw = true;
    this.canvasCtx.beginPath();
    this.canvasCtx.moveTo(x, y);
  }

  private drawLine(x: number, y: number) {
    if (this.draw && (this.tool == 'pencil' || this.tool == 'eraser')) {
      this.canvasCtx.lineTo(x, y);
      this.canvasCtx.stroke();
    }
  }

  stopDraw() {
    const imageData = this.canvasCtx.getImageData(0, 0, this.canvasElement.width, this.canvasElement.height)
    this.history.push(imageData);
    this.historyIndex = this.historyIndex + 1;
    this.draw = false
  }

  public onMouseStart(e: MouseEvent): void {
    this.startDraw(e.clientX, e.clientY);
    this.socket.emit(ON_MOUSE_START_EVENT, e.clientX, e.clientY);
  }

  public onMouseMove(e: MouseEvent): void {
    this.drawLine(e.clientX, e.clientY)
    this.socket.emit(ON_MOUSE_MOVE_EVENT, e.clientX, e.clientY)
  }

  public onMouseEnd(): void {
    this.stopDraw();
    this.socket.emit(ON_MOUSE_END_EVENT)
  }

  public clearCanvas() {
    this.canvasCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.scrachpad.resetDefaultState();
    this.historyIndex = 0;
    this.history = []
  }

  public undo() {
    if (this.historyIndex > 1) {
      const imageData = this.history[this.historyIndex - 2];
      this.canvasCtx.putImageData(imageData, 0, 0);
      this.historyIndex--
    } else {
      this.canvasCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      this.historyIndex = 0
    }
  }
  public redo() {
    if (this.historyIndex < this.history.length) {
      const imageData = this.history[this.historyIndex]
      this.canvasCtx.putImageData(imageData, 0, 0);
      this.historyIndex++
    }
  }

}
