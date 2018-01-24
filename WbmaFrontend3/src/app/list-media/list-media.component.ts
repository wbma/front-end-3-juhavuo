import {Component, OnInit} from '@angular/core';
import {MediaService} from '../services/media.service';
import {DigitransitService} from '../services/digitransit.service';
import {parseHttpResponse} from 'selenium-webdriver/http';

@Component({
  selector: 'app-list-media',
  templateUrl: './list-media.component.html',
  styleUrls: ['./list-media.component.css'],
})
export class ListMediaComponent implements OnInit {

  printThis: string;
  mediaArray: any;
  stopArray: any;

  constructor(
    public mediaService: MediaService, private transit: DigitransitService) {
  }

  ngOnInit() {

    this.printThis = this.mediaService.test;
    this.mediaService.getAllMedia().subscribe(
      data => {
        console.log(data);
        this.mediaArray = data;

        this.mediaArray.map(media => {
          const temp = media.filename.split('.');
          const thumbName = temp[0] + '-tn320.png';
          media.thumbnail = thumbName;
        });

        console.log(this.mediaArray);
      });
    this.transit.getRoutes('Gransinmäki').subscribe(response => {
      console.log(response.data.stops);
      this.stopArray = response.data.stops;
    });
  }
}
