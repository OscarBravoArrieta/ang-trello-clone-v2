 import { Injectable, inject } from '@angular/core'

 import { HttpClient } from '@angular/common/http'

 import { environment } from '@environments/environment'
 import { List, CreateListdDto } from '@models/list.model'
 import { checkToken } from '@interceptors/token.interceptor'
 import { Board } from '@models/board.model'
 import { Card, UpdateCardDto, CreateCardDto } from '@models/card.model'

 @Injectable({
     providedIn: 'root'
 })
 export class ListService {

     private http = inject(HttpClient)

     apiUrl = environment.API_URL

     constructor() { }

     //--------------------------------------------------------------------------------------------

     create(dto: CreateListdDto){

         return this.http.post<List>(`${this.apiUrl}/api/v1/lists`, dto, {
             context: checkToken()
         })

     }

     //--------------------------------------------------------------------------------------------


     //--------------------------------------------------------------------------------------------
 }
