import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { debounce, debounceTime, fromEvent, interval } from 'rxjs';

@Component({
  selector: 'app-debounce',
  templateUrl: './debounce.component.html',
  styleUrls: ['./debounce.component.css']
})
export class DebounceComponent implements AfterViewInit {

  //akıştaki değerlerin zaman aşımı süresini belirleyebilmek için kullanılır.
  @ViewChild("txt")
  txt!:ElementRef;


  ngAfterViewInit(): void {
    // const obs=fromEvent(this.txt.nativeElement,"keyup");
    // obs.pipe(debounce(x=>interval(200))).subscribe(data =>{
    //   console.log(data);
    // }
    // );

    //debounceTime

    const obs=fromEvent(this.txt.nativeElement,"keyup");
    obs.pipe(debounceTime(200)).subscribe(data =>{
      console.log(data);
    }
    );
  }
}
