import { Component, OnInit } from '@angular/core';
import { distinct, of } from 'rxjs';

@Component({
  selector: 'app-distinct',
  templateUrl: './distinct.component.html',
  styleUrls: ['./distinct.component.css']
})
export class DistinctComponent implements OnInit {

  // distinct operatörü ile aynı değerlerin tekrarlanmasını engelleyebiliriz.

  ngOnInit(): void {
    const obs1=of(1,3,5,7,1,3);
    obs1.pipe(distinct()).subscribe(data =>{
      console.log(data);
    }
    );
  }
}
