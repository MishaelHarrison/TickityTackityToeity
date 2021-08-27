import { Component, Input } from '@angular/core';

@Component({
  selector: 'square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent {

  @Input() display: String = '&nbsp;';
  @Input() glow: boolean = false;
  @Input() blue: boolean = false;

  ngOnChanges(){
    if(this.display === ' ') this.display = '&nbsp;';
  }

  color(): String{
    if(this.blue) return 'blue';
    if(this.glow) return 'yellow';
    if(this.display === 'X') return 'red';
    if(this.display === 'O') return 'green';
    return 'lightgrey';
  }

}
