import { Component, inject, OnInit } from '@angular/core'
import { faBox, faWaveSquare, faClock, faAngleUp, faAngleDown, faHeart, faBorderAll, faUsers, faGear } from '@fortawesome/free-solid-svg-icons'
import { faTrello } from '@fortawesome/free-brands-svg-icons'
import { MeService } from '@services/me.service'
import { Board } from '@models/board.model'

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html'
})
export class BoardsComponent implements OnInit  {

     private meService = inject(MeService)
     boards: Board[] = []

     faTrello = faTrello
     faBox = faBox
     faWaveSquare = faWaveSquare
     faClock = faClock
     faAngleUp = faAngleUp
     faAngleDown = faAngleDown
     faHeart = faHeart
     faBorderAll = faBorderAll
     faUsers = faUsers
     faGear = faGear

     //--------------------------------------------------------------------------------------------

     constructor() { }

     //--------------------------------------------------------------------------------------------

     ngOnInit() {

         this.getMeBoards()

     }

     //--------------------------------------------------------------------------------------------



     getMeBoards() {

         this.meService.getMeBoards().subscribe(boards => (
             this.boards = boards
         ))

     }

     //--------------------------------------------------------------------------------------------

}
