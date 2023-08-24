import { Component, OnInit } from '@angular/core';
import { of, partition } from 'rxjs';

@Component({
  selector: 'app-partition',
  templateUrl: './partition.component.html',
  styleUrls: ['./partition.component.css']
})
export class PartitionComponent implements OnInit {
  ngOnInit(): void {
    const obs1=of(1,2,3,4,5,6,7,8,9,10);

    const [obs2,obs3]=partition(obs1,data=>data%4==0);

    obs2.subscribe(data =>{
      console.log("4'e bölünenler: "+data);
    }
    )

    obs3.subscribe(data =>{
      console.log("4'e bölünmeyenler: "+data);
    }
    )
  }
}
