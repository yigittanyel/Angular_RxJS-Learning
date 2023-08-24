import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-interval',
  templateUrl: './interval.component.html',
  styleUrls: ['./interval.component.css']
})
export class IntervalComponent implements OnInit {

  // interval operatörü ile belirtilen süre aralıklarında observable oluşturulabilir.

  ngOnInit(): void {
    const obs=interval(3000);
    obs.subscribe(data =>{
      console.log(`Hello World ${data}`);
    }
    )
  }
}
