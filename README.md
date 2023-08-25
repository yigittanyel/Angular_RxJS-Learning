# Angular ile birlikte RxJS kütüphanesi

## RxJS Nedir?
RxJS, Reactive Extensions for JavaScript'in kısaltmasıdır ve JavaScript tabanlı uygulamalarda reaktif programlama yaklaşımını kullanmayı sağlayan bir kütüphanedir. 

RxJS, özellikle büyük ve karmaşık uygulamalarda veri akışlarını etkili bir şekilde yönetmek isteyen geliştiriciler için güçlü bir araçtır. Reactive Programming (Reaktif Programlama) prensiplerine dayalı olarak çalışarak, veri akışları üzerinde daha açık, güvenilir ve ölçeklenebilir bir kontrol sağlar.

## Reaktif Programlama Nedir?
Reaktif programlama, uygulamaların hızlı değişen verilere ve olaylara hızlı bir şekilde tepki vermesini sağlayan bir programlama yaklaşımıdır. Bu yaklaşım, asenkron olayları daha yönetilebilir ve anlaşılır hale getirir, böylece daha güvenilir ve verimli uygulamalar geliştirilmesine yardımcı olur.

## RxJS'in Temel Kavramları

### Observable
Observable (Gözlemci): Observable, RxJS'de temel bir yapıdır. Bir Observable, zaman içinde bir dizi değeri veya olayı temsil eder. Örneğin, kullanıcı etkileşimleri, ağ istekleri veya zamanla değişen veriler gibi veri akışlarını temsil edebilir. Observable'lar, bu veri akışlarını oluşturur ve bu akıştaki verileri yayınlar. Diğer bileşenler (Observer'lar) bu Observable'ları dinleyerek bu verileri işleyebilirler.

### Observer
Observer (Gözlemleyici): Observer, bir Observable'ın yayınladığı verilere tepki veren bir yapıdır. Observer'lar, Observable'ı "subscribe" ederek (abone olarak) bu veri akışını dinlerler. Bir Observable veri yayınladığında, bu verileri işlemek veya yanıt vermek için Observer'lar kullanılır. Observer'lar, genellikle üç farklı fonksiyonu temsil eden bir nesne veya işlev olarak tanımlanır: next (yeni verileri işlemek), error (hata durumlarını ele almak) ve complete (veri akışının tamamlandığını belirtmek).

Özetle, Observable'lar veri akışlarını temsil eder ve verileri yayınlar, Observer'lar ise bu veri akışlarını dinler ve bu verilere tepki verir. Bu iki temel kavram, reaktif programlamanın temelini oluşturur ve RxJS kütüphanesinin ana bileşenleridir.

### Subjects
Subject, hem veri yayınlayabilen hem de bu verileri dinleyebilen bir yapıdır. RxJS'de, veri akışlarını kontrol etmek ve paylaşmak için kullanılır. Hem Observable hem de Observer olarak işlev görebilir, bu nedenle veri akışlarını yönlendirmek ve koordine etmek için kullanışlıdır.

Replay Subject: Subscribe olan tüm observerlar belirtilen kadar önceki değeri de alırlar.
Async Subject: Subscribe olan tüm observerlar son değeri alırlar. akış complete olmadan son değeri almazlar.
Behaviour Subject: Subscribe olan tüm observerlar bir önceki değeri de alırlar.

Örnek: 
``` typescript
import { BehaviorSubject } from 'rxjs';

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
``` 

Burada şöyle bir çıktı görürüz:
observerA: Yigit
observerB: Yigit
observerA: 1
observerB: 1
observerA: 2
observerB: 2
observerC: 2
observerA: 3
observerB: 3
observerC: 3

### Extra: PIPE
Pipe operatörü ile observable içindeki dataya müdahale edilebilir.

Akış içindeki dataya birden fazla  operatörle müdahale etmek için kullanılır. yani içine birden fazla observable alabilir.

Örnek 1:
``` typescript
import { filter, map, of } from 'rxjs';

const obs1=of(1,2,3,4,5,6,7,8,9,10);
obs1.pipe(filter(x=>x%3==0),map(x=>x*x)).subscribe(data=>console.log(data));
``` 

Bu örnekte obs1 içinde bulunan sayıları 3'e bölünenleri filtreleyip karesini alma işlemi uygulandı.

Örnek 2:
``` typescript
const obs1=of('hello world').pipe(map(data=>data.toUpperCase())).subscribe(data=>console.log(data));
``` 
Bu örnekte observable içindeki datayı büyük harfe çevirme işlemi uygulandı.

## Sık Kullanılan RxJS Operatörleri
### Defer
Defer ile yapılan tanımlamalarda subscribe olunduğu anda observable oluşturulur.

Örnek: 
``` typescript
import { defer, of, timer } from 'rxjs';

const obs1=of(new Date());
const obs2=defer(()=>of(new Date()));

timer(5000).subscribe(() => {
  obs1.subscribe((v)=>console.log('obs1',v));
  obs2.subscribe((v)=>console.log('obs2',v));
});
```

Burada sonuç olarak şöyle değerler dönüyor: 
obs1 => Thu Aug 24 2023 15:20:50 GMT+0300 (GMT+03:00)
obs2 => Thu Aug 24 2023 15:20:55 GMT+0300 (GMT+03:00)

Sonuçlardan da görüleceği üzere defer ile yapılan tanımlamalarda subscribe olunduğu anda observable oluştu.

### From
From operatörü ile array, promise, observable, string gibi değerlerden observable oluşturulabilir.

Örnek 1 : 
``` typescript
import { from } from 'rxjs';

 const sayilar=[1,2,3,4,5];
 const obs=from(sayilar);
 obs.subscribe(data =>{
  console.log(data);
})
```
Burada sonuç olarak sırasıyla 1,2,3,4,5 değerlerini görürüz.

Örnek 2:
``` typescript
import { from } from 'rxjs';

const araclar=new Map<number,string>();
    araclar.set(1,'BMW');
    araclar.set(2,'Mercedes');
    araclar.set(3,'Audi');

    const obs=from(araclar);

    obs.subscribe(data =>{
      console.log(data);
    })
```
Burada sonuç olarak dictionary misali key,value tipinde sonuçlar görürüz. 
1, BMW 
2, Mercedes gibi


### From Event
FromEvent operatörü ile eventler yakalanarak observable oluşturulabilir ve buna göre bir aksiyon alınabilir.

Örnek: 
```typescript
import { fromEvent } from 'rxjs';

    var btn1 = document.getElementById('btn1') as HTMLElement;
    const obs=fromEvent(btn1,'click');

    obs.subscribe(data =>{
      console.log("Button Clicked");
    }
    )
```

Burada html kısmında oluşturduğumuz btn1 id'li butona her tıklandığında oluşan olayı yakalıyoruz ve console ekranına 'button clicked' yazdırıyoruz.

### Generate
Generate operatörü ile belirtilen koşula göre observable oluşturulabilir.

Örnek.
```typescript
import { generate } from 'rxjs';
    const obs=generate(50,x=>x>0,x=>x-2);

    obs.subscribe(data =>{
      console.log(data);
    }
    )
```

Burada sonuç olarak 50'den başlayan ve değer 0'dan büyük oldukça 2'şer azaltan sayılar gelecek. Örneğin: 50,48,46,44..... gibi.

### IIf
Iif operatörü ile koşula göre observable oluşturulabilir.

Örnek:
``` typescript
import { iif, of } from 'rxjs';

let state:boolean=true;

const obs=iif(()=>state,of("True"),of("False"));

obs.subscribe(data =>{
  console.log(data);
}
)
state=false;
obs.subscribe(data =>{
  console.log(data);
}
)
}
```

Burada ilk koşul true olduğu için ilk önce o yazar. Devamında state değiştiği için ekranda false görürüz.

### Interval
Interval operatörü ile belirtilen süre aralıklarında observable oluşturulabilir.

Örnek:
``` typescript
import { interval } from 'rxjs';

const obs=interval(3000);
obs.subscribe(data =>{
  console.log(`Hello World ${data}`);
}
``` 

Burada 3 saniye'de bir ekranda hello world ve index yazar. Örneğin Hello World 0, Hello World 1 gibi.

### Timer
Timer operatörü ile belirtilen süre aralıklarında observable oluşturulabilir.

Örnek:
``` typescript
    timer(3000,1000).subscribe(data =>{
      console.log(`Hello World ${data}`);
    }
    )
``` 
Burada 3 saniye sonra Hello World ve indeks yazar. Devamında da her 1 saniyede bir tekrar Hello World 1,2 gibi devam eder.

### Audit - AuditTime
Audit ile işlemler devam ederken müdahale edip araya farklı bir işlem daha yaptırmak için tercih edilen bir operatördür.

Örnek : 
``` typescript
import { audit, auditTime, interval, map } from 'rxjs';

const obs1 = interval(1000);
const obs2 = obs1.pipe(audit((data) => interval(2000)), map((data) => data +' değeri'));

obs2.subscribe((data) => {
  console.log(data);
}
);
``` 

Örnek 2:
``` typescript
    const obs1 = interval(1000);
    const obs2 = obs1.pipe(auditTime(3000), map((data) => data +' değeri'));

    obs2.subscribe((data) => {
      console.log(data);
    }
    );
```

Her iki örnek de aynı işlevde kullanılır. Amaç, bir işlem gerçekleşirken müdahale edip farklı bir işlem araya sokmaktır. Audit time'da sadece audit'ten farklı olarak interval değeri içinde direkt olarak verilir.

Sonuç olarak burada 2-5-8 gibi değerler görürüz. Burada her seferinde 1 saniyeye ilaveten içeride de audit ile 2 saniye daha ekledik. Her seferinde 3 saniyede bir tekrar edecek şekilde bir örnek gerçekleştirildi.

### Concat
Concat operatörü ile iki observable birleştirilir ve biri bittikten sonra diğeri çalışır.

Örnek:
``` typescript
import { of,concat } from 'rxjs';
const obs1=of(1,2,3);
const obs2=of(4,5,6);

const obs3=concat(obs1,obs2);
obs3.subscribe(data =>{
  console.log(data);
}
)
``` 

Burada çıktı olarak 1,2,3,4,56 görürüz. Yani bir birleştirme işlemi yapılır.

### Merge
Merge operatörü ile birden fazla observable birleştirilebilir. Concat'dan farklı olarak veriler sıralı biçimde değil çalışan observable'ın çalışma hızına vs.'ye göre değişiklik göstererek gelir.

Örnek:
``` typescript
import { merge, interval, take } from 'rxjs';

const timer1 = interval(1000).pipe(take(10));
const timer2 = interval(2000).pipe(take(6));
const timer3 = interval(500).pipe(take(10));

const concurrent = 2; // the argument
const merged = merge(timer1, timer2, timer3, concurrent);
merged.subscribe((x) => console.log(x));
``` 

Burada sonuç olarak 0,1,0,2,3,1 gibi bir değer görürüz. 

### Debounce - Debounce Time
Debounce operatörü, akıştaki değerlerin zaman aşımı süresini belirleyebilmek için kullanılır.

Örnek:
``` typescript
import { debounce, debounceTime, fromEvent, interval } from 'rxjs';

const obs=fromEvent(this.txt.nativeElement,"keyup");
obs.pipe(debounceTime(200)).subscribe(data =>{
  console.log(data);
}
);
```

Her iki örnek de aynı işlevde kullanılır. Debounce time'da sadece debounce'den farklı olarak interval değeri içinde direkt olarak verilir.

Örnekte her keyup eventinden sonra değil, 200ms'den sonra gerçekleştirilen eventler tetiklenerek verinin çok sayıda tekrarla manipüle ederek bozulması vb. gibi hareketlerin önüne geçilebilir.

### Distinct
Distinct operatörü ile aynı değerlerin tekrarlanmasını engelleyebiliriz.

Örnek:
``` typescript 
import { distinct, of } from 'rxjs';

const obs1=of(1,3,5,7,1,3);
obs1.pipe(distinct()).subscribe(data =>{
  console.log(data);
}
);
```

Burada sonuç olarak 1,3,5,7 döner.

### Filter
Filter operatörü ile observable içerisindeki veriler filtrelenir.

Örnek:
``` typescript
import { filter, map, of } from 'rxjs';

const obs = of("Ahmet", "Mehmet", "Ayşe", "Fatma", "Ali", "Veli", "Zeynep", "Kemal", "Can", "Mert")
.pipe(
  map(data => data.toLowerCase()), // Verileri küçük harfe dönüştür
  filter(data => data.length > 4 && data.indexOf("a") === -1)
);
obs.subscribe(data => {
  console.log(data);
}
);
```

Burada sonuç olarak bize mehmet,zeynep değerleri gelecektir.

### Ignore Elements
IgnoreElements operatörü ile observable içindeki değerler ile ilgilenmeyip sonuçları ile işlem yapabiliriz.

Örnek:
``` typescript
import { ignoreElements, of } from 'rxjs';

const obs1=of(1,2,3);
obs1.pipe(ignoreElements())
.subscribe({
  error:err=>console.log(err),
  complete:()=>console.log("Completed")
}
);
```

Burada sonuç olarak bize Completed değeri dönecektir. Eğer bir hata olsaydı hata fırlatılıp error yazılacaktı.

### Partition
Partition operatörü ile belirtilen koşula göre observable ikiye farklı davranış gösterir.

Örnek:
``` typescript
import { of, partition } from 'rxjs';
const obs1=of(1,2,3,4,5,6,7,8,9,10);
const [obs2,obs3]=partition(obs1,data=>data%4==0);
obs2.subscribe(data =>{
  console.log("4'e bölünenler: "+data);
}
)
obs3.subscribe(data =>{
  console.log("4'e bölünmeyenler: "+data);
}
)
```

Burada aslında izlenebilir nesnemizi 4 ile bölünenler ve bölünmeyenler olarak iki farklı davranışa böldük. Ekran çıktısı olarak da ilk olarak 4'e bölünenler akabinde de 4'e bölünmeyenler değerleri ile birlikte ekranda yazacaktır.

<hr>

## Gerçek Hayat Örnekleri

Jsonplaceholder sitesindeki todos listesi için metotlar yazalım. GetTodos isimli metodumuz olsun ve bu metotta gelecek verilerden ilk 10 veriyi alalım ve bunların sadece id ve title kısımlarını yazdıralım. Akabinde de GetTodosWithSearch metodumuzda input'a girilen text'e göre arama yapıp buna göre sonuç döndürelim.

Todo Service:
``` typescript
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
```

Ts dosyamız:

``` typescript
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
```

GetTodos'dan dönen değer şu şekilde : <br>
1 - delectus aut autem
2 - quis ut nam facilis et officia qui
3 - fugiat veniam minus
4 - et porro tempora
5 - laboriosam mollitia et enim quasi adipisci quia provident illum
6 - qui ullam ratione quibusdam voluptatem quia omnis
7 - illo expedita consequatur quia in
8 - quo adipisci enim quam ut ab
9 - molestiae perspiciatis ipsa
10 - illo est ratione doloremque quia maiores aut

Search için "qui" yazdığımızda gelen sonuç şöyle:<br>
2 - quis ut nam facilis et officia qui
5 - laboriosam mollitia et enim quasi adipisci quia provident illum
6 - qui ullam ratione quibusdam voluptatem quia omnis
7 - illo expedita consequatur quia in
10 - illo est ratione doloremque quia maiores aut

<hr>
Hazırlarken faydalandığım kaynaklar:<br>
Gençay Yıldız hocamızın ücretsiz sunduğu YouTube playlisti : https://www.youtube.com/watch?v=tEUda4YzCI4&list=PLQVXoXFVVtp1v1_D_8ocGOsWFGvK1Ha-E&index=1 <br>
RxJS Documentation : https://rxjs.dev/guide/overview <br>
Udemy Fatih Çakıroğlu Angular & RxJS kursu

<hr>
Umarım verimli olur. İyi çalışmalar dilerim :)

<b> Yiğit Tanyel </b>
