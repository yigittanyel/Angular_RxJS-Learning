# Angular ile birlikte RxJS kütüphanesi
## Operatörler

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





