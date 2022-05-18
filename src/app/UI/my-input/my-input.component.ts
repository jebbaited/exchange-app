import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-my-input',
  templateUrl: './my-input.component.html',
  styleUrls: ['./my-input.component.scss'],
})
export class MyInputComponent implements OnInit {
  @Input() id: string = '';
  @Input() type?: string = 'number';
  @Input() inputFieldValue: string = '';

  @Output() inputFieldValueChange = new EventEmitter<string>();

  public onInputChange(newValue: string): void {
    this.inputFieldValueChange.emit(newValue);
  }

  constructor() {}

  ngOnInit(): void {}
}
