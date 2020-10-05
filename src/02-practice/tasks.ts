import { addItem, run } from './../03-utils';
import { first, last, elementAt, min, max, find, findIndex, single, switchMap } from 'rxjs/operators';
import { asyncScheduler, from, fromEvent, generate, of } from 'rxjs';
import { ajax } from "rxjs/ajax";

// Task 1. first()
// Создайте поток объектов с двумя свойствами: action и priority
// Получите первый объект из потока с высоким приоритетом
(function task1(): void {
    const stream$ = of(
        { action: 'a', priority: 1 },
        { action: 'b', priority: 2 },
      ).pipe(first(obj => obj.priority === 1));
  
    // run(stream$);
})();

// Task 2. last()
// Создайте поток слов из предложения 'Мягкое слово кости не ломит'. Получите последнюю слово, которое содержит 2 символа
(function task2(): void {
    const sentense = "Мягкое слово кости не ломит"
    const stream$ = from(sentense.split(' ')).pipe(
        last(word => word.length === 2)
    )
    
    // run(stream$);
})();


// Task 3. elementAt()
// Создайте поток событий клик по документу. Получите второй объект события клик.
(function task3(): void {
    const stream$ = fromEvent(document, 'click').pipe(elementAt(1));
    
    // run(stream$, { outputMethod: "console"});
})();

// Task 4. min()
// Создайте массив из 3 случайных чисел. Выведите массив в консоль.
// Создайте поток из этого массива. Получите минимальное число из потока 
(function task4() {
    const arr = [Math.random(), Math.random(), Math.random()];
    const stream$ = from(arr).pipe(min());

    // run(stream$);
})();



// Task 5. max()
// Создайте поток объектов с двумя свойствами: title, quantity.
// Получите объект с максимальным значением quantity 
(function task5() {
    interface Obj {
        title: string;
        quantity: number;
    }
    const source$ = of<Obj> (
        { title: '1', quantity: 1 },
        { title: '2', quantity: 2 },
        { title: '3', quantity: 3 }
    );
        
    const stream$ = source$.pipe(
        max((a: Obj, b: Obj) => (a.quantity < b.quantity ? -1 : 1))
    );

    // run(stream$);
})();

// Task 6. find()
// Создайте поток объектов с двумя свойствами: id, name.
// Получите объект с id = 3  
(function task6() {
    const source$ = of(
        { id: 1, name: '1' },
        { id: 2, name: '2' },
        { id: 3, name: '3' }
    );
    const stream$ = source$.pipe(find(obj => obj.id === 3))

    // run(stream$);
})();

// Task7. findIndex()
// Создайте поток объектов с двумя свойствами: id, name.
// Получите номер объекта в потоке, у которого длина name больше 10 символов  
(function task7() {
    const source$ = from([
        { id: 1, name: '1' },
        { id: 2, name: 'a big name from the array'},
        { id: 3, name: '3' }
    ]);
    const stream$ = source$.pipe(findIndex(obj => obj.name.length > 10));

    // run(stream$);
})();

// Task 8. single()
// Создайте поток объектов с двумя свойствами: title, priority так, чтобы некоторые объекты
// имели одинаковые значения title
// Получите объект у которого title = 'Learn RxJS', если он единственный в потоке
(function task8() {
    interface Obj {
        title: string;
        priority: number;
    }
    const source$ = of<Obj> (
        { title: '1', priority: 1 },
        { title: '2', priority: 2 },
        { title: 'Learn RxJS', priority: 3 }
    );
    const stream$ = source$.pipe(single(obj => obj.title === "Learn RxJS"))
    
    // run(stream$);
})();

// Homework

// Task1. first()
// Створити поток значень від 4 до 30 з рандомним кроком.
// Отримати gthibq елемент кратний 3. 
// У випадку відсутності такого елемента виводити 100.

(function taskH1() {
    const max = 10;
    const min = 1;

    const handleProcess = {
     initialState: 4,
     condition: (value: number) => value <= 30,
     iterate: (value: number) => value + Math.floor(Math.random() * (max - min + 1)) + min,
     resultSelector: (value: number) => value,
     scheduler: asyncScheduler
    };
    
    const stream$ = generate(handleProcess).pipe(first(number => number%3 === 0, 100))
    
    // run(stream$);
})();

// Task 2. ajax()
// Вкиростовуючи ajax('http://jsonplaceholder.typicode.com/users') видати ім'я сьомого юзера.
// У випадко його відсутності вивести "Doesn't exist!"

(function taskH2() {
    const stream$ = ajax('http://jsonplaceholder.typicode.com/users').pipe(
        switchMap(el => el.response.map(user => user.name)),
        elementAt(7, "Doesn't exist!")
    )

    // run(stream$);
})();

// Task3. min()
// Вивести найкоротше слово у реченні.

(function taskH3() {
    const sentance = "Sometimes there are words that you've seen, read, and maybe even used in conversation whose meaning you can never keep straight.";
    
    const stream$ = from(sentance.split(' ')).pipe(min((a: string, b: string) => (a.length < b.length ? -1 : 1)))
    
    // run(stream$);
})();

export function runner() {}