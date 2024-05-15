import { Component, Input } from '@angular/core';
import IItem from './IItem';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent {

  @Input() item: IItem;
  expand: boolean = false;
  itemToAdd:'file' | 'folder' | '' = '';
  fileOrFolderName: string = '';

  fileIConClass = 'item-icon fa-regular fa-file'
  folderIConClass = 'item-icon fa-regular fa-folder'
  editStart: boolean;


  addFile() {
    this.itemToAdd = 'file' ;
    this.expand = true;  
  }

  addFolder() {
    this.itemToAdd = 'folder' ;
    this.expand = true;   
  }

  enterClick () {
    let newItem : IItem = {
      id: Date.now(),
      name: this.fileOrFolderName,
      editable: true,
      deletable: true,
      expandable: false,
      type: this.itemToAdd == 'file' ? 'file' :'folder',
      children: []
    }
    this.item.children.push(newItem)
    this.expand = true;
    this.fileOrFolderName = ''
    this.itemToAdd =''
    
  }

  toggleFolders() {
    this.expand = !this.expand
  }


  deleteItem () {

  }

}
