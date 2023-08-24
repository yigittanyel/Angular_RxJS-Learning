import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css'],
})
export class SubjectComponent implements OnInit {
  ngOnInit(): void {

    //replay subject ile subscribe olan tüm observerlar belirtilen kadar önceki değeri de alırlar.
    //async subject ile subscribe olan tüm observerlar son değeri alırlar. akış complete olmadan son değeri almazlar.
    //behavior subject ile subscribe olan tüm observerlar bir önceki değeri de alırlar.

    let data: any = 'Yigit';
    const subject = new BehaviorSubject(data);
    subject.subscribe({
      next: (v) => console.log(`observerA: ${v}`),
    });
    subject.subscribe({
      next: (v) => console.log(`observerB: ${v}`),
    });

    subject.next(1);
    subject.next(2);

    subject.subscribe({
      next: (v) => console.log(`observerC: ${v}`),
    });

    subject.next(3);
  }
}
