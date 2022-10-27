import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataSharedService {
  private counterSource = new BehaviorSubject<number>(0);
  counter = this.counterSource.asObservable();
  constructor() {}

  changeCounter(counter: number) {
    this.counterSource.next(counter);
  }
}
