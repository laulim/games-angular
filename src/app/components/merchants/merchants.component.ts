import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Merchant } from '../../services/games.service';

@Component({
  selector: 'app-merchants',
  templateUrl: './merchants.component.html',
  styleUrls: ['./merchants.component.sass'],
})
export class MerchantsComponent implements OnInit {
  @Input() merchants: Merchant[];
  @Output() merchantsChanged: EventEmitter<string[]> = new EventEmitter<
    string[]
  >();

  handleMerchantChange(event: MatSelectChange): void {
    this.merchantsChanged.emit(event.value);
  }

  ngOnInit(): void {}
}
