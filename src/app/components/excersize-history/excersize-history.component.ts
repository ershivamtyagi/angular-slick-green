import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Excersizes } from 'src/app/common/excersizes';
import { ListOfExersizes } from 'src/app/common/list-of-exersizes';

@Component({
  selector: 'app-excersize-history',
  templateUrl: './excersize-history.component.html',
  styleUrls: ['./excersize-history.component.scss'],
})
export class ExcersizeHistoryComponent implements OnInit {

  constructor(private route:ActivatedRoute, private httpClient: HttpClient) { }
  products: Excersizes[] ;
  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.getHistory();
    });
  }
  
  private baseUrl1 = 'http://localhost:8080/api/excersizeHistory/getExcersizeHistory';
  id: number ;
  eID: number;
  getHistory(){
    this.id = +this.route.snapshot.paramMap.get('userId');
    this.eID = +this.route.snapshot.paramMap.get('excersizeId');
    console.log(this.id+":is userId,"+this.eID+":is eid");
   
     this.httpClient.get<Excersizes>(`${this.baseUrl1}/${this.id}/${this.eID}`).subscribe(this.processResult());
  }
  processResult() {
    return data => {
      
      this.products = data.excersizesList;
      console.log(JSON.stringify(this.products));
    };
  }
}