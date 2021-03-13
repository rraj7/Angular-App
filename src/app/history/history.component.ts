import { Component, OnInit } from '@angular/core';
import { clspend } from '../spend/spend.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  arrSpend: clspend [] = new Array();

  constructor() { }

  ngOnInit(): void {
    var data = localStorage.getItem("purchase");
    if (data !== 'undefined' && data !== null) {
      this.arrSpend = JSON.parse(localStorage.getItem("spend")!);
    }
  }

}
