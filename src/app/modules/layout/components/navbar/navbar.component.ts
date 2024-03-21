 import { Component } from '@angular/core'
 import { Router } from '@angular/router'
 import {
     faBell,
     faInfoCircle,
     faClose,
     faAngleDown
 } from '@fortawesome/free-solid-svg-icons'
 import { Colors, NAVBAR_BACKGROUNDS } from '@models/colors.model'

 import { AuthService } from '@services/auth.service'
 import { BoardsService } from '@services/boards.service'

 @Component({
     selector: 'app-navbar',
     templateUrl: './navbar.component.html',
 })
 export class NavbarComponent {
     faBell = faBell
     faInfoCircle = faInfoCircle
     faClose = faClose
     faAngleDown = faAngleDown

     isOpenOverlayAvatar = false
     isOpenOverlayBoards = false
     isOpenOverlayCreateBoard = false

     user$ = this.authService.user$
     navBarBackGroundColor: Colors = 'sky'
     navBarColors = NAVBAR_BACKGROUNDS

     constructor(
         private authService: AuthService,
         private router: Router,
         private boardService: BoardsService
     ) {
         this.boardService.backgrounColor$.subscribe(color => {
             this.navBarBackGroundColor = color

         })
     }

     logout() {
         this.authService.logout()
         this.router.navigate(['/login'])
     }

     close(event: boolean) {

         this.isOpenOverlayCreateBoard = event

     }

     get colors (): any {

         const classes = this.colors[this.navBarBackGroundColor]
         return classes ? classes : {}

     }

 }
