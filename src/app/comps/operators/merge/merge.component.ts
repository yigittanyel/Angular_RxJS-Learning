import { Component, OnInit } from '@angular/core';
import { of,merge } from 'rxjs';

@Component({
  selector: 'app-merge',
  templateUrl: './merge.component.html',
  styleUrls: ['./merge.component.css']
})
export class MergeComponent implements OnInit {
  ngOnInit(): void {

    // merge operatörü ile birden fazla observable birleştirilebilir. concat'dan farklı olarak veriler sıralı biçimde değil çalışan observable'ın çalışma hızına vs.'ye göre
    // değişiklik göstererek gelir.

    const obs1=of(1,2,3);
    const obs2=of(4,5,6,"yigit","semih","yusuf");
    const obs3=of(7,8,9);

    const obs4=merge(obs1,obs2,obs3);

    obs4.subscribe(data =>{
      console.log(data);
    }
    )
  }
}
