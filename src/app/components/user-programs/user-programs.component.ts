import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Program } from 'src/app/common/program';

@Component({
  selector: 'app-user-programs',
  templateUrl: './user-programs.component.html',
  styleUrls: ['./user-programs.component.scss'],
})
export class UserProgramsComponent implements OnInit {

  constructor(private route:ActivatedRoute, private httpClient: HttpClient) { }
  products: Program[] ;
  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.getPrograms();
    });
  }
  private baseUrl1 = 'http://localhost:8080/api/programs/getUserPrograms';
  getPrograms() {
    this.httpClient.get<Program[]>(`${this.baseUrl1}`).subscribe(this.processResult());
  }
  processResult() {
    return data => {
      
      this.products = data;
      console.log(JSON.stringify(this.products));
    };
  }

}
