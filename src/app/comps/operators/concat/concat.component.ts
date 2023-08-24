import { Component, OnInit } from '@angular/core';
import { of,concat } from 'rxjs';

@Component({
  selector: 'app-concat',
  templateUrl: './concat.component.html',
  styleUrls: ['./concat.component.css']
})
export class ConcatComponent implements OnInit {
  ngOnInit(): void {
    const obs1=of(1,2,3);
    const obs2=of(4,5,6);

    const obs3=concat(obs1,obs2);
    obs3.subscribe(data =>{
      console.log(data);
    }
    )
  }
}
