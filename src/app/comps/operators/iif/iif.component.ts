import { Component, OnInit } from '@angular/core';
import { iif, of } from 'rxjs';

@Component({
  selector: 'app-iif',
  templateUrl: './iif.component.html',
  styleUrls: ['./iif.component.css']
})
export class IifComponent implements OnInit {
  ngOnInit(): void {

    // iif operatörü ile koşula göre observable oluşturulabilir.
    let state:boolean=true;

    const obs=iif(()=>state,of("True"),of("False"));

    obs.subscribe(data =>{
      console.log(data);
    }
    )
    state=false;
    obs.subscribe(data =>{
      console.log(data);
    }
    )
  }
}
