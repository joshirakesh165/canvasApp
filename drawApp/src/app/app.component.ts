import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FileExplorerComponent } from './file-explorer/file-explorer.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BoardComponent } from './board/board.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FileExplorerComponent,ToolbarComponent,SidebarComponent,BoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'drawApp';
}
