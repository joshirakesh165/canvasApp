import { Component } from '@angular/core';
import { ScrachpadService } from '../scrachpad.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  colors = ['red', 'green', 'yellow', 'blue'];
  strockSize: number;
  tool: string;


  constructor(private scrachpad: ScrachpadService) {
    this.scrachpad.getCanvasConfig().subscribe(state => {
      this.strockSize = state.strokeSize;
      this.tool = state.tool;
    })
  }

  changeColor(color: string) {
    let { strokeSize,tool,clear } = this.scrachpad.getConfigValue()
    this.scrachpad.setcanvasConfig({ selectedColor: color,clear:clear, strokeSize: strokeSize,tool:tool })
  }

  changeStrokeSize(size: number) {
    let { selectedColor,clear,tool } = this.scrachpad.getConfigValue();
    this.scrachpad.setcanvasConfig({ selectedColor: selectedColor, strokeSize: size,clear:clear,tool:tool })
  }

  pickColor(e: any) {
    this.changeColor(e.target.value);
  }

}
