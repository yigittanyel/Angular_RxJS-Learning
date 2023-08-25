import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoModel } from '../models/todo-model';
import { from, map, mergeMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  getTodos() {
    return this.http
      .get<TodoModel[]>('https://jsonplaceholder.typicode.com/todos')
      .pipe(
        mergeMap((todos) => from(todos)),
        take(10),
        map((x) => `${x.id} - ${x.title}`)
      );
  }

  getTodosWithSearch(search: string) {
    return this.http
      .get<TodoModel[]>('https://jsonplaceholder.typicode.com/todos')
      .pipe(
        mergeMap((todos) => from(todos)),
        take(10),
        map((x) => `${x.id} - ${x.title}`),
        map((x) => (x.includes(search.toLowerCase()) ? x :null))
      );
  }
}

//result:
// 1 - delectus aut autem
// 2 - quis ut nam facilis et officia qui
// 3 - fugiat veniam minus
// 4 - et porro tempora
// 5 - laboriosam mollitia et enim quasi adipisci quia provident illum
// 6 - qui ullam ratione quibusdam voluptatem quia omnis
// 7 - illo expedita consequatur quia in
// 8 - quo adipisci enim quam ut ab
// 9 - molestiae perspiciatis ipsa
// 10 - illo est ratione doloremque quia maiores aut


//result 2
//2 - quis ut nam facilis et officia qui
//5 - laboriosam mollitia et enim quasi adipisci quia provident illum
//6 - qui ullam ratione quibusdam voluptatem quia omnis
//7 - illo expedita consequatur quia in
//10 - illo est ratione doloremque quia maiores aut
