import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { clusers } from '../home/home.component';

export class clpurchase {
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
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  arrPurchase: clpurchase[] = new Array();
  arrCustomer: clusers[] = new Array();
  newPurchaseItem: any = {};

  name = "";
  token = 0;
  IsSaved = false;
  msg = "";
  constructor() { }

  ngOnInit(): void {
    var data = localStorage.getItem("purchase");
    if (data !== 'undefined' && data !== null) {
      this.arrPurchase = JSON.parse(localStorage.getItem("purchase")!);
    }
  }

  addNewUser() {
    if (this.arrPurchase.filter(asd => asd.name === this.newPurchaseItem.name).length == 1) {
      this.arrPurchase.filter(asd => asd.name === this.newPurchaseItem.name).map(e => { e.token += this.newPurchaseItem.token; e.desc += "," + this.newPurchaseItem.desc });
    }
    else {
      this.arrPurchase.push(this.newPurchaseItem);

    }
    this.newPurchaseItem = {};
    localStorage.setItem("purchase", JSON.stringify(this.arrPurchase));
    this.msg = "Record Saved";
    this.IsSaved = true;
  }

  blurCheckName() {
    console.log("blurCheckName() " + this.newPurchaseItem.name);
    if (this.newPurchaseItem.name !== '') {
      this.arrCustomer = JSON.parse(localStorage.getItem("customer")!);
      if ((this.arrCustomer.filter(asd => asd.name.toLowerCase() === this.newPurchaseItem.name.toLowerCase())).length == 0) {
        this.msg = "User Not Found. Please add customer";
        this.newPurchaseItem.name = "";
        this.IsSaved = true;
      }
    }
  }

  focuscalled() {
    this.IsSaved = false;
    this.msg = "";
  }

}
