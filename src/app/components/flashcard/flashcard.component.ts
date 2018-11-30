import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommunicationService } from '../../services/communication.service';
import { InquiryService } from '../../services/inquiry.service';

enum FlipState {
  INITIAL = 'initial',
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
      state(FlipState.INITIAL, style({
        transform: 'rotateY(0deg)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in')),
      transition('active => initial', animate('0ms ease-out'))
    ])
  ]
})
export class FlashcardComponent implements OnInit, OnChanges {
  flip: FlipState;

  @Input() expression: Expression;

  constructor(private inquiryService: InquiryService,
              private communicationService: CommunicationService) {
  }

  ngOnInit() {
    this.flip = FlipState.INACTIVE;
  }

  toggleFlip() {
    this.flip = (this.flip === FlipState.INACTIVE) ? FlipState.ACTIVE : FlipState.INACTIVE;
  }

  getForeignMeaning(): string {
    return this.inquiryService.getForeignMeaning(this.expression);
  }

  getNativeMeaning(): string {
    return this.inquiryService.getNativeMeaning(this.expression);
  }

  // TODO: is this necessary?
  getPronunciation(): string {
    return 'Prönöunsieischän';
  }

  update(isKnown: boolean): void {
    this.expression.isAnswered = true;
    this.expression.isKnown = isKnown;
    this.inquiryService.updateExpression(this.expression);
    this.communicationService.say(`${this.expression.meaning_en} was known: ${isKnown}`);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.flip = FlipState.INITIAL;
  }
}
