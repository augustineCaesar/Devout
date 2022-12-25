import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DailyReadings } from '../interfaces/dailyReadings.interface';
import { Firestore, doc, docData, onSnapshot, serverTimestamp, collection, query, where, getDocs } from '@angular/fire/firestore';
import { ref, Storage } from '@angular/fire/storage';
import {format} from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class ReadingsService {
  // readingsURL = "https://dna-node-backend.herokuapp.com/fetchDailyReadings";
  // readingsURL = "https://safe-retreat-99561.herokuapp.com/dailyreadings";
  readingsSubject: BehaviorSubject<{}> = new BehaviorSubject({});
  catholicBibleUrl = '/assets/books/latinvulgate.json';
  newTestament;
  oldTestament;
  fullBible;
 
  constructor( private http: HttpClient, private firestore: Firestore,) { }

  getReadings() {
    this.http.get<DailyReadings>('',{}).subscribe({
      next: data => {
          console.dir(data)
          this.readingsSubject.next(data);
         
      },
      error: error => {
        console.dir(error)
          console.error('There was an error!', error);
      }
    });
  }

  async getReadingx(today) {
    let readings: DailyReadings;
    console.log(today);
    console.log('Dec_07_2022');
    const readingsRef = doc(this.firestore, 'daily_readings', "Dec_07_2022");
    try {
      const q = onSnapshot(readingsRef, (doc) => {
        console.log(doc.data());
        if(doc.data()){
        // const goodReadings = Object.assign(readings, doc.data())
        // console.dir(goodReadings);
        this.readingsSubject.next(doc.data());
      } else {
        console.log('no doc here!!!')
      }
      });

    } catch (error) { 
      this.readingsSubject.next({"First_reading":"Check your internet connection"});
    }
  }

  getCatholicBible() { 
    this.http.get(this.catholicBibleUrl,{}).subscribe({
      next: (data:[]) => {
          console.dir(data)
          this.fullBible = data;
          this.oldTestament = data.slice(0,46);
          console.log('old testament:', this.oldTestament);
          this.newTestament = data.slice(46);
          console.log('new testament', this.newTestament);
      },
      error: error => {
        console.dir(error)
          console.error('There was a catholic bible error!', error);
      }
    });
  }
}



