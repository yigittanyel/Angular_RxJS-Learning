import { Component, OnInit } from '@angular/core';
import { generate } from 'rxjs';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css']
})
export class GenerateComponent implements OnInit {
  ngOnInit(): void {

    // generate operatörü ile belirtilen koşula göre observable oluşturulabilir.

    const obs=generate(50,x=>x>0,x=>x-2);

    obs.subscribe(data =>{
      console.log(data);
    }
    )
  }
}
