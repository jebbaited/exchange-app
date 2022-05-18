import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { SelectedCurrency } from 'src/app/types/types';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() defaultValue: string = '';
  @Input() id: string = '';

  @Output() onChanged = new EventEmitter<SelectedCurrency>();

  public onSelectChange(newValue: string): void {
    if (newValue) this.onChanged.emit({ id: this.id, currency: newValue });
  }

  constructor() {}

  ngOnInit(): void {}
}
