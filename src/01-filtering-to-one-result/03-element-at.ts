// elementAt<T>(
//     index: number, 
//     defaultValue?: T
// ): MonoTypeOperatorFunction<T>

import { of, fromEvent } from 'rxjs';
import { elementAt } from 'rxjs/operators';
import { run } from '../03-utils';

// index exists, emit value and complete
export function elementAtDemo1() {
  const source$ = of(5, 4, 7, 2, 8);
  const stream$ = source$.pipe(elementAt(2));

  // run(stream$);
}

// index doesn't exist or negative, emit error
export function elementAtDemo2() {
  const source$ = of(5, 4, 7, 2, 8);
  const stream$ = source$.pipe(elementAt(10));

  // run(stream$);
}

// index doesn't exist, use default value and complete
export function elementAtDemo3() {
  const source$ = of(5, 4, 7, 2, 8);
  const stream$ = source$.pipe(elementAt(10, 100));

  // run(stream$);
}

// emit 2-nd click on runBtn button and complete
export function elementAtDemo4() {
  const clicks$ = fromEvent(document.getElementById('runBtn'), 'click');
  const stream$ = clicks$.pipe(elementAt(1));

  // run(stream$);
}
