import axios from 'axios';
import { Component, OnInit } from '@angular/core';
import { Currency, RatesToPublish } from '../types/types';
import { DataService } from '../data-service/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public loading: boolean = true;
  public ratesToPublish: RatesToPublish = {};

  constructor(private data: DataService) {}

  private async getAllRates() {
    try {
      const response = await axios.get<Currency[]>(
        'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11'
      );
      this.goThroughRates(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  }

  private goThroughRates(data: Currency[]) {
    data?.forEach((value: Currency) => {
      switch (value.ccy) {
        case 'USD':
          this.setBuyAndSaleString('USD', value);
          break;
        case 'EUR':
          this.setBuyAndSaleString('EUR', value);
          break;
      }
    });
  }

  private setBuyAndSaleString(currency: string, value: Currency) {
    this.ratesToPublish[currency as keyof RatesToPublish] = value;
    value.buyAndSale = `${value.buy.slice(0, -3)} / ${value.sale.slice(0, -3)}`;
  }

  ngOnInit() {
    this.getAllRates();
    this.data.currentRates.subscribe((rates) => (this.ratesToPublish = rates));
  }
}
