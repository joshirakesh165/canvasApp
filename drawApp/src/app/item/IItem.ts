export default interface IItem {
    id:number,
    expandable:boolean
    name:string,
    editable:boolean,
    deletable: boolean,
    type: 'file'| 'folder',
    children:IItem[]
}