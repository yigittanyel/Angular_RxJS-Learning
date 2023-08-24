import { Component, OnInit } from '@angular/core';
import { defer, of, timer } from 'rxjs';

@Component({
  selector: 'app-defer',
  templateUrl: './defer.component.html',
  styleUrls: ['./defer.component.css']
})
export class DeferComponent implements OnInit {
  ngOnInit(): void {

    //obs1 Thu Aug 24 2023 15:20:50 GMT+0300 (GMT+03:00)
    //obs2 Thu Aug 24 2023 15:20:55 GMT+0300 (GMT+03:00)
    //görüldüğü üzere defer ile yapılan tanımlamalarda subscribe olunduğu anda observable oluşturulur.

    const obs1=of(new Date());
    const obs2=defer(()=>of(new Date()));

    timer(5000).subscribe(() => {
      obs1.subscribe((v)=>console.log('obs1',v));
      obs2.subscribe((v)=>console.log('obs2',v));
    });
  }
}
