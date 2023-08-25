import { Component, OnInit } from '@angular/core';
import { ignoreElements, of } from 'rxjs';

@Component({
  selector: 'app-ignore-elements',
  templateUrl: './ignore-elements.component.html',
  styleUrls: ['./ignore-elements.component.css']
})
export class IgnoreElementsComponent implements OnInit {

  // ignoreElements operatörü ile observable ın değerlerini görmezden gelebiliriz.

  ngOnInit(): void {
    const obs1=of(1,2,3);
    obs1.pipe(ignoreElements())
    .subscribe({
      error:err=>console.log(err),
      complete:()=>console.log("Completed")
    }
    );
  }
}
