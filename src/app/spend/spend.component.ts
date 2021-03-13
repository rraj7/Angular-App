import { Component, OnInit } from '@angular/core';
import { clusers } from '../home/home.component';
import { clpurchase } from '../purchase/purchase.component';

export class clspend {
  name = "";
  token = 0;
  desc = "";
  constructor(_name: string, _token: 0, _desc: string) {
    this.name = _name;
    this.token = _token;
    this.desc = _desc;
  }
}

@Component({
  selector: 'app-spend',
  templateUrl: './spend.component.html',
  styleUrls: ['./spend.component.css']
})
export class SpendComponent implements OnInit {

  arrPurchase: clpurchase[] = new Array();
  arrCustomer: clusers[] = new Array();
  arrSpend: clspend[] = new Array();
  newSpendItem: any = {};

  name = "";
  token = 0;
  IsSaved = false;
  msg = "";
  constructor() { }

  ngOnInit(): void {
    var data = localStorage.getItem("spend");
    if (data !== 'undefined' && data !== null) {
      this.arrSpend = JSON.parse(localStorage.getItem("spend")!);
    }
    data = localStorage.getItem("purchase");
    if (data !== 'undefined' && data !== null) {
      this.arrPurchase = JSON.parse(localStorage.getItem("purchase")!);
    }
  }

  addNewUser() {

    var data = this.arrPurchase.filter(asd => asd.name.toLowerCase() === this.newSpendItem.name.toLowerCase());
    if (data !== null) {
      if (data[0].token >= this.newSpendItem.token) {
        this.arrSpend.push(this.newSpendItem);

        if (this.arrPurchase.filter(asd => asd.name.toLowerCase() === this.newSpendItem.name.toLowerCase()).length == 1) {
          this.arrPurchase.filter(asd => asd.name.toLowerCase() === this.newSpendItem.name.toLowerCase()).map(e => e.token -= this.newSpendItem.token);
          localStorage.setItem("purchase", JSON.stringify(this.arrPurchase));
        }
        this.newSpendItem = {};
        localStorage.setItem("spend", JSON.stringify(this.arrSpend));
        this.msg = "Record Saved";
        this.IsSaved = true;
      }
      else {
        this.msg = "Insufficient Balance. Please purchase some tokens";
        this.IsSaved = true;
      }


    }
  }
  blurCheckName() {
    console.log("blurCheckName() " + this.newSpendItem.name);
    if (this.newSpendItem.name !== '') {
      this.arrCustomer = JSON.parse(localStorage.getItem("customer")!);
      if ((this.arrCustomer.filter(asd => asd.name.toLowerCase() === this.newSpendItem.name.toLowerCase())).length == 0) {
        this.msg = "User Not Found. Please add customer";
        this.newSpendItem.name = "";
        this.IsSaved = true;
      }
    }
  }

  focuscalled() {
    this.IsSaved = false;
    this.msg = "";
  }


}
