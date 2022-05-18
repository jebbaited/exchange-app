import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RatesToPublish } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private messageSource = new BehaviorSubject<RatesToPublish>({});
  currentRates = this.messageSource.asObservable();

  constructor() {}

  changeCurrentRates(currentRates: RatesToPublish) {
    this.messageSource.next(currentRates);
  }
}
