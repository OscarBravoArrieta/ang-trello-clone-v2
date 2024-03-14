import { Component, Input, OnInit } from '@angular/core'
import { Colors, COLORS } from '@models/colors.model'

@Component({
  selector: 'app-card-color',
  templateUrl: './card-color.component.html'
})
export class CardColorComponent implements OnInit {

     //@Input() color: 'sky' | 'yellow' | 'green' | 'red' | 'violet' | 'gray' = 'sky'
     @Input() color: Colors = 'sky';

     mapColors = COLORS;


     //--------------------------------------------------------------------------------------------

     ngOnInit(): void {
         let a
     }

     //--------------------------------------------------------------------------------------------

     get colors() {

         const classes = this.mapColors[this.color];
         return classes ? classes : {};

     }
     //--------------------------------------------------------------------------------------------

}
