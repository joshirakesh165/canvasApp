import { Component } from '@angular/core';
import { ScrachpadService } from '../scrachpad.service';
import { CommonModule } from '@angular/common';

const PENCIL = 'pencil';
const ERASER = 'eraser';
const CLEAR = 'clear';
const UNDO = 'undo';
const REDO = 'redo';
const DOWNLOAD = 'download';


@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

  constructor(private scrachpad: ScrachpadService) {
    this.scrachpad.getCanvasConfig().subscribe(state => {
      this.selectedIcon = state.tool
    })
  }


  selectedIcon: string = PENCIL;
  icons = [
    {
      name: PENCIL,
      class: 'toolbar-icon fa-solid fa-pencil',
    },
    {
      name: ERASER,
      class: 'toolbar-icon fa-solid fa-eraser',
    },
    {
      name: UNDO,
      class: 'toolbar-icon fa-solid fa-rotate-left',
    },
    {
      name: REDO,
      class: 'toolbar-icon fa-solid fa-rotate-right',
    },
    {
      name: DOWNLOAD,
      class: 'toolbar-icon fa-solid fa-download',
    },
    {
      name: CLEAR,
      class: 'toolbar-icon fa-solid fa-xmark',
    },
  ];


  onIconClick(icon: string) {
    switch (icon) {
      case PENCIL:
        this.selectPencil();
        break;
      case ERASER:
        this.erase();
        break
      case CLEAR:
        this.clearCanvas();
        break;
      case UNDO:
        this.undo();
        break;
      case REDO:
        this.redo();
        break;
      case DOWNLOAD:
        this.download();
        break;
    }

  }

  public selectPencil() {
    this.scrachpad.resetDefaultState();
  }

  public erase(): void {
    this.scrachpad.setcanvasConfig({ selectedColor: 'white', strokeSize: 100, clear: false, tool: ERASER })
  }

  public clearCanvas(): void {
    this.scrachpad.setcanvasConfig({ ...this.scrachpad.getConfigValue(), clear: true, tool: CLEAR })
  }

  public undo(): void {
    this.scrachpad.setcanvasConfig({ ...this.scrachpad.getConfigValue(), clear: false, tool: UNDO })

  }
  public redo(): void {
    this.scrachpad.setcanvasConfig({ ...this.scrachpad.getConfigValue(), clear: false, tool: REDO })

  }
  public download(): void {
    this.scrachpad.setcanvasConfig({ ...this.scrachpad.getConfigValue(), clear: false, tool: DOWNLOAD })

  }


}
