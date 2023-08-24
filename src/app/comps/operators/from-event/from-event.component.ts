import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-from-event',
  templateUrl: './from-event.component.html',
  styleUrls: ['./from-event.component.css']
})
export class FromEventComponent implements OnInit {
  ngOnInit(): void {

    //fromEvent operatörü ile eventler yakalanarak observable oluşturulabilir ve buna göre bir aksiyon alınabilir.

    var btn1 = document.getElementById('btn1') as HTMLElement;
    const obs=fromEvent(btn1,'click');

    obs.subscribe(data =>{
      console.log("Button Clicked");
    }
    )
  }
}
