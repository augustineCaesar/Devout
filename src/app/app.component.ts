import { Component } from '@angular/core';
import { ReadingsService } from './providers/readings.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor( public readingsProvider: ReadingsService) {
    this.readingsProvider.getReadings();
  }
}
