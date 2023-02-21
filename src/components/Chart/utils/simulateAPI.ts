import { BehaviorSubject, delay, interval, map, Subject } from "rxjs";

export const data$ = new Subject();

/**
 * Array that contains the data stock data over time
 */
export const progressiveData: {
  open: number,
  high: number,
  low: number,
  close: number,
  volume: number,
  /**
   * time in seconds since 1970, 1st january
   */
  time: number
}[] = [];

/**
 * Emits value every second
 * @param data
 */
function emitter(data: any[]) {
  /**
   * Copy of the provided data
   */
  let dataCopy = [...data];

  // NOTE With setTimeout()
  //   for (let i = 1; i < data.length + 1; i++) {
  //     setTimeout(() => {
  //       data$.next(dataCopy.shift());
  //     }, 2000 * i);
  //   }

  // NOTE With setInterval()

  const interval = setInterval(() => {
    const next = dataCopy.splice(0, 20);

    if (next.length > 0) {
      data$.next(next);
    }
    else {
      data$.complete();
      clearInterval(interval);
    }
  }, 500);
}

/**
 * Simulates an API by emitting data every second
 * @param data
 */
export function simulateAPI(data: any[]) {
  emitter(data);
}
