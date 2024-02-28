 import { Injectable, inject } from '@angular/core'
 import { HttpClient } from '@angular/common/http'

 import { environment } from '@environments/environment'
 import { checkToken } from '@interceptors/token.interceptor'
 import { User } from '@models/user.model'
 import { Board } from '@models/board.model'


 @Injectable({
     providedIn: 'root'
 })
 export class BoardsService {

     private http = inject(HttpClient)
     apiUrl = environment.API_URL

     constructor() { }

     getBoards(id: Board['id']) {
         return this.http.get<Board>(`${this.apiUrl}/api/v1/boards/${id}`, {
             context: checkToken(),
         })
     }
 }
