import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';

@Component({
  selector: 'app-from',
  templateUrl: './from.component.html',
  styleUrls: ['./from.component.css']
})
export class FromComponent implements OnInit {
  ngOnInit(): void {

    //from operatörü ile array, promise, observable, string gibi değerlerden observable oluşturulabilir.

    //Example 1

    // const sayilar=[1,2,3,4,5];
    // const obs=from(sayilar);
    // obs.subscribe(data =>{
    //   console.log(data);
    // })

    //Example 2

    const araclar=new Map<number,string>();
    araclar.set(1,'BMW');
    araclar.set(2,'Mercedes');
    araclar.set(3,'Audi');

    const obs=from(araclar);

    obs.subscribe(data =>{
      console.log(data);
    })
  }
}
