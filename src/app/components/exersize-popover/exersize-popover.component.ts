import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { NavParams, PopoverController } from '@ionic/angular';
import { ExcersizeListResponse } from 'src/app/common/excersize-list-response';

@Component({
  selector: 'app-exersize-popover',
  templateUrl: './exersize-popover.component.html',
  styleUrls: ['./exersize-popover.component.scss'],
})
export class ExersizePopoverComponent implements OnInit {
  excersizeResponseList:ExcersizeListResponse[];
  constructor(private navParams:NavParams,private popoverController:PopoverController,private httpClient:HttpClient) { }
  name:string;
  ngOnInit() {
    this.name=this.navParams.get('name');
    this.provideListOFExcersize();
  }
  ClosePopover(){
    this.popoverController.dismiss();
  }
  clickButton(name){
    this.popoverController.dismiss(name);
  }
  private baseUrl11 = 'http://localhost:8080/api/excersizes';
  provideListOFExcersize(){
    this.httpClient.get<GetResponseExcersizes>(`${this.baseUrl11}/search/findByNameContaining?name=`+this.name).subscribe(this.processDataExcersize());
   
  }
  processDataExcersize() {
    console.log("called")
    return (data) => {
      this.excersizeResponseList=data._embedded.excersizes;
    };
  }
}
interface GetResponseExcersizes{
  _embedded: {
    excersizes: ExcersizeListResponse[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}