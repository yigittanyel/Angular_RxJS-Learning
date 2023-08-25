import { Component, OnInit } from '@angular/core';
import { filter, map, of } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  // filter operatörü ile observable içerisindeki veriler filtrelenir.

  ngOnInit(): void {
    const obs = of("Ahmet", "Mehmet", "Ayşe", "Fatma", "Ali", "Veli", "Zeynep", "Kemal", "Can", "Mert")
    .pipe(
      map(data => data.toLowerCase()), // Verileri küçük harfe dönüştür
      filter(data => data.length > 4 && data.indexOf("a") === -1)
    );
    obs.subscribe(data => {
      console.log(data);
    }
    );
  }
}
