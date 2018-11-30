import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommunicationService } from '../../services/communication.service';
import { InquiryService } from '../../services/inquiry.service';
import { AppState } from '../../state/app.state';

@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.scss']
})
export class InquiryComponent implements OnInit {
  expression: Expression;

  constructor(private store: Store<AppState>,
              private inquiryService: InquiryService,
              private communicationService: CommunicationService) {
  }

  ngOnInit() {
    this.expression = this.inquiryService.next();

    this.communicationService.hear().subscribe(hearing => {
      this.expression = this.inquiryService.next();
      console.log(`InquiryComponent received a message: ${hearing}`);
    });
  }

  continue(): void {
    window.console.log('InquiryComponent::continue clicked.');
    this.inquiryService.loadExpressions().subscribe(expressions => {
      this.expression = this.inquiryService.next();
    });
  }

  stop(): void {
    window.console.log('InquiryComponent::stop clicked.');
  }
}
