import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orderData = new BehaviorSubject<any>(null);

  orderData$ = this.orderData.asObservable();

  constructor() {}

  updateOrderData(data: any) {
    this.orderData.next(data);
  }
}

