import { Component } from '@angular/core';
import IItem from '../item/IItem';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-file-explorer',
  standalone: true,
  imports: [ItemComponent],
  templateUrl: './file-explorer.component.html',
  styleUrl: './file-explorer.component.scss'
})
export class FileExplorerComponent {

  item: IItem = {
      id: 0,
      name:'Files',
      editable:false,
      deletable:false,
      type:'folder',
      expandable:true,
      children:[]
    };

}
