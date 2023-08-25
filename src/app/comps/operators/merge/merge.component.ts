import { Component, OnInit } from '@angular/core';
import { merge, interval, take } from 'rxjs';

@Component({
  selector: 'app-merge',
  templateUrl: './merge.component.html',
  styleUrls: ['./merge.component.css'],
})
export class MergeComponent implements OnInit {
  ngOnInit(): void {
    // merge operatörü ile birden fazla observable birleştirilebilir. concat'dan farklı olarak veriler sıralı biçimde değil çalışan observable'ın çalışma hızına vs.'ye göre
    // değişiklik göstererek gelir.

    const timer1 = interval(1000).pipe(take(10));
    const timer2 = interval(2000).pipe(take(6));
    const timer3 = interval(500).pipe(take(10));

    const concurrent = 2; // the argument
    const merged = merge(timer1, timer2, timer3, concurrent);
    merged.subscribe((x) => console.log(x));
  }
}
