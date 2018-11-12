import { Component, OnInit } from '@angular/core';
import { RestEndpoints } from '../../enums/rest.endpoints.enum';
import { Chapter } from '../../models/chapter.model';
import { RestHttpService } from '../../services/rest.http.service';

@Component({
  selector: 'app-chapter-overview',
  templateUrl: './chapter-overview.component.html',
  styleUrls: ['./chapter-overview.component.scss']
})
export class ChapterOverviewComponent implements OnInit {

  chapters: Chapter[];

  constructor(private httpService: RestHttpService) {
  }

  ngOnInit() {
    this.httpService.doGet(RestEndpoints.CHAPTERS).subscribe(chapters => this.chapters = chapters);
  }
}
