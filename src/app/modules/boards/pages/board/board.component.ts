import { Component, inject, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { BoardsService } from '@services/boards.service'


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

     board: Board | null = null

    constructor() {}

    ngOnInit(): void {
         this.route.paramMap.subscribe(params => {
             const id = params.get('boardId')
             if(id) {
                 this.getBoard(id)
             }
         })
     }

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

     addColumn() {
         // this.columns.push({
         // title: 'New Column',
         // todos: [],
         // })
     }

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

    private getBoard(id: string) {

         this.boardsService.getBoards(id).subscribe(board => {

             this.board = board

         })

    }

    private updateCard(card: Card, position: number, listId: string | number) {
        this.cardsService.update(card.id, { position, listId })
        .subscribe((cardUpdated) => {
          console.log(cardUpdated);
        })
      }
}
