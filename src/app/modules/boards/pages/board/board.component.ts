 import { Component, inject, OnInit, OnDestroy } from '@angular/core'
 import { ActivatedRoute } from '@angular/router'
 import { BoardsService } from '@services/boards.service'
 import { FormControl, Validators } from '@angular/forms'


 import {
     CdkDragDrop,
     moveItemInArray,
     transferArrayItem,
 } from '@angular/cdk/drag-drop'
 import { Dialog } from '@angular/cdk/dialog'
 import { TodoDialogComponent } from '@boards/components/todo-dialog/todo-dialog.component'

 import { ToDo, Column } from '@models/todo.model'
 import { Board } from '@models/board.model'
 import { Card } from '@models/card.model'
 import { CardsService } from '@services/cards.service'
 import { List } from '@models/list.model'
 import { ListService } from '@services/list.service'
 import { BACKGROUNDS } from '@models/colors.model'

 @Component({
     selector: 'app-board',
     templateUrl: './board.component.html',
     styles: [
         `
             .cdk-drop-list-dragging .cdk-drag {
                 transition: transform 250ms cubic-bezier(0, 0, 0.2, 1)
             }
             .cdk-drag-animating {
                transition: transform 300ms cubic-bezier(0, 0, 0.2, 1)
             }
         `,
     ],
})
export class BoardComponent implements OnInit  {

     private dialog = inject(Dialog)
     private route = inject(ActivatedRoute)
     private cardsService = inject(CardsService)
     private boardsService = inject(BoardsService)
     private listService = inject(ListService)

     board: Board | null = null

     inputCard = new FormControl<string>('', {
         nonNullable: true,
         validators: [Validators.required]
     })

     inputList = new FormControl<string>('', {
         nonNullable: true,
         validators: [Validators.required]
     })

     showListForm = false
     colorBackgrounds = BACKGROUNDS


     // -------------------------------------------------------------------------------------------

     constructor() {}

     // -------------------------------------------------------------------------------------------

     ngOnInit(): void {
         this.route.paramMap.subscribe(params => {
             const id = params.get('boardId')
             if(id) {
                 this.getBoard(id)
             }
         })
     }

     // -------------------------------------------------------------------------------------------

     drop(event: CdkDragDrop<Card[]>) {

         if (event.previousContainer === event.container) {
             moveItemInArray(
                 event.container.data,
                 event.previousIndex,
                 event.currentIndex
             )
             } else {
             transferArrayItem(
                 event.previousContainer.data,
                 event.container.data,
                 event.previousIndex,
                 event.currentIndex
             )}

         const position = this.boardsService.getPosition(event.container.data, event.currentIndex )
         const card = event.container.data[event.currentIndex]
         const listId = event.container.id
         this.updateCard(card, position, listId)

     }

     // -------------------------------------------------------------------------------------------
     ngOndestroy(): void {
         this.boardsService.setBackGroundColor('sky')

     }
     // -------------------------------------------------------------------------------------------


     addList() {

         const title = this.inputList.value
         if(this.board) {
             this.listService.create({
                 title,
                 boardId: this.board.id,
                 position: this.boardsService.getPositionNewItem(this.board.lists)
             })
             .subscribe(list => {

                 this.board?.lists.push({
                     ...list,
                     cards: []
                 })

                 this.showListForm = true
                 this.inputList.setValue('')
             })
         }

     }

     // -------------------------------------------------------------------------------------------

     openDialog(card: Card) {
         const dialogRef = this.dialog.open(TodoDialogComponent, {
         minWidth: '300px',
         maxWidth: '50%',
         data: {
             card: card,
         },
         })
         dialogRef.closed.subscribe((output) => {
         if (output) {
             console.log(output)
         }
         })
     }

     // -------------------------------------------------------------------------------------------

     private getBoard(id: string) {

         this.boardsService.getBoards(id).subscribe(board => {

             this.board = board
             this.boardsService.setBackGroundColor(this.board.backgroundColor)


         })

     }

     // -------------------------------------------------------------------------------------------

    private updateCard(card: Card, position: number, listId: string | number) {
         this.cardsService.update(card.id, { position, listId })
         .subscribe((cardUpdated) => {
             console.log(cardUpdated);
         })
     }

     // -------------------------------------------------------------------------------------------

     openFormCard(list: List){

         if(this.board?.lists) {
             this.board.lists = this.board.lists.map(iteratorList => {
                 if (iteratorList.id === list.id) {
                     return {
                         ...iteratorList,
                         showCardForm: true
                     }
                 }

                 return {
                     ...iteratorList,
                     showCardForm: false
                 }
             })
         }

     }

     // -------------------------------------------------------------------------------------------

     createCard(list: List) {

         const title = this.inputCard.value
         console.log(title)
         if (this.board ) {
             this.cardsService.create({
                 title,
                 listId: list.id,
                 boardId: this.board.id,
                 position: this.boardsService.getPositionNewItem(list.cards),
             }).subscribe(card => {
                 list.cards.push(card)
                 this.inputCard.setValue('')
                 list.showCardForm = false
             })
         }
     }

     // -------------------------------------------------------------------------------------------

     closecardForm(list: List) {

         list.showCardForm = false

     }

     // -------------------------------------------------------------------------------------------
     get colors() {
         if (this.board) {
             const classes = this.colorBackgrounds[this.board.backgroundColor]
             return classes ? classes: {}
         }
         return {}

     }
     // -------------------------------------------------------------------------------------------


}
