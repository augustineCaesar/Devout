import { Component, OnDestroy, OnInit } from '@angular/core';
import { DailyReadings } from '../interfaces/dailyReadings.interface';
import { ReadingsService } from '../providers/readings.service';
import {format} from 'date-fns';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy{
  today = new Date();
  fortoday = format(this.today, 'MMM /dd /yyyy');
  dailyReadingsSub;
  myDaily: DailyReadings= {
    First_reading:"", Second_readingsrc:'',First_readingsrc:'',
    Second_reading: '', Psalm:'',Psalmsrc:'',allelluia:'',Gospel:'',
    Gospelsrc:'', Feast:'',
  };
  constructor( private readingsProvider: ReadingsService) {}

  ngOnInit(): void {
    const today = new Date();
    const ftoday = format(this.today, 'MMM_dd_yyyy');
    this.readingsProvider.getReadingx(ftoday);
    this.dailyReadingsSub = this.readingsProvider.readingsSubject.subscribe( (reading: DailyReadings) => {
      this.myDaily = reading;
      
    })
  }

  ngOnDestroy(): void {
    this.dailyReadingsSub.unsubscribe();
  }

  doRefresh(event) {
    this.readingsProvider.getReadings();
    setTimeout(() => {

     event.target.complete();
    }, 2500);
  }
}
