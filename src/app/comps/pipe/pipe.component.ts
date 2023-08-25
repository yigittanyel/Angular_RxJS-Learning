import { Component, OnInit } from '@angular/core';
import { filter, map, of } from 'rxjs';

@Component({
  selector: 'app-pipe',
  templateUrl: './pipe.component.html',
  styleUrls: ['./pipe.component.css']
})
export class PipeComponent implements OnInit {

  //pipe operatörü ile observable içindeki dataya müdahale edilebilir.
  //akış içindeki dataya birden fazla  operatörle müdahale etmek için kullanılır. yani içine birden fazla observable alabilir.


  ngOnInit(): void {
    //örnek olarak observable içindeki datayı büyük harfe çevirelim.

    //const obs1=of('hello world').pipe(map(data=>data.toUpperCase())).subscribe(data=>console.log(data));

    const obs1=of(1,2,3,4,5,6,7,8,9,10);

    //burada da obs1 içinde bulunan sayıları 3'e bölünenleri filtreleyip karesini alalım.
    obs1.pipe(filter(x=>x%3==0),map(x=>x*x)).subscribe(data=>console.log(data));
  }
}
