 import { Card } from "./card.model"

 export interface List {

     id: string
     title: string
     position: number
     cards: Card[]
     showCardForm?: boolean

 }

 export interface CreateListdDto extends Omit <List, 'id' | 'cards'> {

     boardId: string

 }
