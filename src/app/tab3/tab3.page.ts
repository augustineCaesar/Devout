import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import verses from 'kjv/json/verses-1769.json';
import { ReadingsService } from '../providers/readings.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  constructor(private http: HttpClient, private readingsProvider: ReadingsService) {
    const catholicBible = this.http.get('./../../assets/books/latinvulgate.json');
  }

  ngOnInit(): void {
    this.readingsProvider.getCatholicBible();
    console.log(verses['John 4:16']);

  }

  getNT() {
    console.log('get new testament books');
  }
}
