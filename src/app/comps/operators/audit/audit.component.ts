import { Component, OnInit } from '@angular/core';
import { audit, auditTime, interval, map } from 'rxjs';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css'],
})
export class AuditComponent implements OnInit {
  ngOnInit(): void {
    //audit ile işlemler devam ederken müdahale edip araya farklı bir işlem daha yaptırmak için tercih edilen bir operatördür.

    // const obs1 = interval(1000);
    // const obs2 = obs1.pipe(audit((data) => interval(2000)), map((data) => data +' değeri'));

    // obs2.subscribe((data) => {
    //   console.log(data);
    // }
    // );

    //auditTime audit operatörüne benzer fakat auditTime belirtilen süre kadar bekler ve o süre içerisinde gelen değerleri alır.
    const obs1 = interval(1000);
    const obs2 = obs1.pipe(auditTime(3000), map((data) => data +' değeri'));

    obs2.subscribe((data) => {
      console.log(data);
    }
    );
  }
}
