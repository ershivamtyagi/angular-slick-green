import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ExcersizeHistory } from 'src/app/common/excersize-history';

@Component({
  selector: 'app-excersize-history',
  templateUrl: './excersize-history.component.html',
  styleUrls: ['./excersize-history.component.scss'],
})
export class ExcersizeHistoryComponent implements OnInit {

  constructor(private route:ActivatedRoute, private httpClient: HttpClient) { }
  products:Array<ExcersizeHistory[]> ;
  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.getHistory();
    });
  }

  private baseUrl1 = 'http://localhost:8080/getExcersizeHistory';
  id: number ;
  eID: number;
  getHistory(){
    this.id = +this.route.snapshot.paramMap.get('userId');
    this.eID = +this.route.snapshot.paramMap.get('excersizeId');
    console.log(this.id+":is userId,"+this.eID+":is eid");
   
     this.httpClient.get<Array<ExcersizeHistory[]>>(`${this.baseUrl1}/${this.id}/${this.eID}`).subscribe(this.processResult());
  }
  processResult() {
    return data => {
      console.log(data);
      this.products = data;
    };
  }
}