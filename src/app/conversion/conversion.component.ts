import { Component, OnInit } from '@angular/core';
import {
  DefaultSelectValues,
  RatesToPublish,
  SelectedCurrency,
} from '../types/types';
import { DataService } from '../data-service/data.service';

interface Rates {
  USD?: number;
  EUR?: number;
  UAN: number;
}

@Component({
  selector: 'app-conversion',
  templateUrl: './conversion.component.html',
  styleUrls: ['./conversion.component.scss'],
})
export class ConversionComponent implements OnInit {
  public defaultSelectValues: DefaultSelectValues = {
    GIVE: {
      id: 'give',
      currency: 'UAN',
    },
    GET: {
      id: 'get',
      currency: 'USD',
    },
  };

  public giveValue: string = '';
  public getValue: string = '';

  private selectedCurrency: DefaultSelectValues = this.defaultSelectValues;

  private rates: Rates = {
    USD: 0,
    EUR: 0,
    UAN: 1,
  };

  private currentRates: RatesToPublish = {};

  private isTouchedGetInput: boolean = false;
  private isTouchedGiveInput: boolean = false;

  constructor(private data: DataService) {}

  public onInputGiveChange(give: string) {
    this.isTouchedGiveInput = true;
    this.isTouchedGetInput = false;

    this.giveValue = give;

    if (this.selectedCurrency.GET.currency === 'UAN') {
      this.getValue = this.countInputValue('GIVE', 'multiply', give);
    } else {
      this.getValue = this.countInputValue('GET', 'divide', give);
    }

    if (give === '') this.clearInputs();
  }

  public onInputGetChange(get: string) {
    this.isTouchedGetInput = true;
    this.isTouchedGiveInput = false;
    this.getValue = get;

    if (this.selectedCurrency.GIVE.currency === 'UAN') {
      this.giveValue = this.countInputValue('GET', 'multiply', get);
    } else {
      this.giveValue = this.countInputValue('GIVE', 'divide', get);
    }

    if (get === '') this.clearInputs();
  }

  public onChangedGiveSelect(changedCurrency: SelectedCurrency) {
    this.selectedCurrency.GIVE.currency = changedCurrency.currency;
    this.selectedCurrency.GET.currency = 'UAN';

    if (!this.isTouchedGiveInput) {
      if (
        this.selectedCurrency.GIVE.currency ===
        this.selectedCurrency.GET.currency
      ) {
        this.giveValue = this.getValue;
      } else {
        this.giveValue = this.countInputValue('GIVE', 'divide', this.getValue);
      }
    } else {
      this.getValue = this.countInputValue('GIVE', 'multiply', this.giveValue);
    }

    if (this.giveValue === '0.00') this.clearInputs();
  }

  public onChangedGetSelect(changedCurrency: SelectedCurrency) {
    this.selectedCurrency.GET.currency = changedCurrency.currency;
    this.selectedCurrency.GIVE.currency = 'UAN';

    if (!this.isTouchedGetInput) {
      if (
        this.selectedCurrency.GIVE.currency ===
        this.selectedCurrency.GET.currency
      ) {
        this.getValue = this.giveValue;
      } else {
        this.getValue = this.countInputValue('GET', 'divide', this.giveValue);
      }
    } else {
      this.giveValue = this.countInputValue('GET', 'multiply', this.getValue);
    }

    if (this.getValue === '0.00') this.clearInputs();
  }

  private countInputValue(
    selectToUse: string,
    sign: 'divide' | 'multiply',
    valueFromInput: string
  ): string {
    selectToUse = selectToUse.toUpperCase();
    const rate =
      this.rates[
        this.selectedCurrency[selectToUse as keyof DefaultSelectValues]
          .currency as keyof Rates
      ] || 0;

    return (sign === 'divide' ? +valueFromInput / rate : +valueFromInput * rate)
      .toFixed(2)
      .toString();
  }

  private setRates() {
    if (this.currentRates === undefined) return;

    Object.keys(this.currentRates).forEach((key: string) => {
      this.rates[key as keyof Rates] =
        Number(this.currentRates[key as keyof RatesToPublish]?.sale) || 0;
    });
  }

  private clearInputs() {
    this.giveValue = '';
    this.getValue = '';
  }

  ngOnInit(): void {
    this.data.currentRates.subscribe((rates) => (this.currentRates = rates));
  }

  ngDoCheck() {
    this.setRates();
  }
}
