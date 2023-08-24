import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  ngOnInit(): void {

    // timer operatörü ile belirtilen süre aralıklarında observable oluşturulabilir.

    timer(3000,1000).subscribe(data =>{
      console.log(`Hello World ${data}`);
    }
    )
  }
}
