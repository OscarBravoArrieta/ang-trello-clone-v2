 import { Card } from "./card.model"
 import { List } from "./list.model"
 import { User } from "./user.model"

 export interface Board {

     id: string
     title: string
     backgroundColor: 'sky' | 'yellow'  | 'green' | 'red' | 'violet' | 'gray'
     members: User[]
     lists: List[]
     cards: Card[]

 }
