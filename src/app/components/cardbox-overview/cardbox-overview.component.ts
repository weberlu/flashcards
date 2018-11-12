import { Component, OnInit } from '@angular/core';
import { RestEndpoints } from '../../enums/rest.endpoints.enum';
import { CardBox } from '../../models/cardbox.model';
import { RestHttpService } from '../../services/rest.http.service';

@Component({
  selector: 'app-cardbox-overview',
  templateUrl: './cardbox-overview.component.html',
  styleUrls: ['./cardbox-overview.component.scss']
})
export class CardboxOverviewComponent implements OnInit {

  cardboxes: CardBox[];

  constructor(private httpService: RestHttpService) {
  }

  ngOnInit() {
    this.httpService.doGet(RestEndpoints.CARD_BOXES).subscribe(cardboxes => this.cardboxes = cardboxes);
  }
}
