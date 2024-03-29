 import { Injectable, inject } from '@angular/core'

 import { HttpClient } from '@angular/common/http'

 import { environment } from '@environments/environment'
 import { User } from '@models/user.model'
 import { checkToken } from '@interceptors/token.interceptor'
 import { Board } from '@models/board.model'
 import { Card, UpdateCardDto, CreateCardDto } from '@models/card.model'

 @Injectable({
     providedIn: 'root'
 })
 export class CardsService {

     private http = inject(HttpClient)

     apiUrl = environment.API_URL

     constructor() { }

     //--------------------------------------------------------------------------------------------

     create(dto: CreateCardDto){

         return this.http.post<Card>(`${this.apiUrl}/api/v1/cards`, dto, {
             context: checkToken()
         })

     }

     //--------------------------------------------------------------------------------------------

     update(id: Card['id'], changes: UpdateCardDto) {

         return this.http.put<Card>(`${this.apiUrl}/api/v1/cards/${id}`, changes, {
             context: checkToken()
         })

     }

     //--------------------------------------------------------------------------------------------
     //--------------------------------------------------------------------------------------------
 }
