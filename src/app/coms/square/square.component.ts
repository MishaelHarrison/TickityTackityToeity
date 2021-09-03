import { Component, Input } from '@angular/core';

@Component({
  selector: 'square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css'],
})
export class SquareComponent {
  @Input() display: String = '&nbsp;';
  @Input() glow: boolean = false;
  @Input() blue: boolean = false;

  ngOnChanges() {
    if (this.display === ' ') this.display = '&nbsp;';
  }

  class(): String {
    if (this.blue) return 'tie' + this.display;
    if (this.glow) return 'glow' + this.display;
    if (this.display === 'X') return 'X';
    if (this.display === 'O') return 'O';
    return 'none';
  }
}
