import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, iif, map, merge, mergeMap, of } from 'rxjs';

@Component({
  selector: 'app-real-life-scenario',
  templateUrl: './real-life-scenario.component.html',
  styleUrls: ['./real-life-scenario.component.css']
})
export class RealLifeScenarioComponent implements OnInit {

search = new FormControl('');

  ngOnInit(): void {

    // this.todoService.getTodos().subscribe(datas => {
    //   console.log(datas);
    // }
    // );

    // this.todoService.getTodosWithSearch('qui').subscribe(datas => {
    //   console.log(datas);
    // }
    // );

    this.search.valueChanges
    .pipe(
      debounceTime(500),
      map((val: string | null) => (val ? val.trim() : '')),
      distinctUntilChanged(),
      mergeMap((val: string) =>
        iif(() => val.length >= 4, of(val), of(''))
      ),
      mergeMap((val: string) => {
        if (val === '') {
          return of(null);
        } else {
          return this.todoService.getTodosWithSearch(val);
        }
      })
    )
    .subscribe((datas) => {
      if (datas !== null) {
        console.log(datas);
      }
    });
  }

  constructor(private todoService:TodoService) { }

}
