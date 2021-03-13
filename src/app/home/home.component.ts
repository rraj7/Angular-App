import { Component, OnInit } from '@angular/core';

export class clusers {
  name = "";

  constructor(_name: string) {
    this.name = _name;
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  arrCustomer: clusers[] = new Array();
  newUserItem: any = {};
  name = "";
  IsSaved = false;
  constructor() { }

  ngOnInit(): void {


    var data = localStorage.getItem("customer");
    if (data !== 'undefined' && data !== null) {
      this.arrCustomer = JSON.parse(localStorage.getItem("customer")!);
    }

  }

  addNewUser() {
    this.arrCustomer.push(this.newUserItem);
    this.newUserItem = {};
    localStorage.setItem("customer", JSON.stringify(this.arrCustomer));
    this.IsSaved = true;
  }

  focuscalled(){
    this.IsSaved = false;
  }

}
