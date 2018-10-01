import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

enum FlipState {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

/**
 * Original link:
 *
 * https://stackblitz.com/edit/angular-card-flip?file=app%2Fcard%2Fcard.component.ts
 * https://davidwalsh.name/css-flip
 *
 */
@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.scss'],
  animations: [
    trigger('flipState', [
      state(FlipState.ACTIVE, style({
        transform: 'rotateY(180deg)'
      })),
      state(FlipState.INACTIVE, style({
        transform: 'rotateY(0deg)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])
  ]
})
export class FlashcardComponent implements OnInit {
  flip: FlipState;


  constructor() {}

  ngOnInit() {
    this.flip = FlipState.INACTIVE;
  }

  toggleFlip() {
    this.flip = (this.flip === FlipState.INACTIVE) ? FlipState.ACTIVE : FlipState.INACTIVE;
  }
}
