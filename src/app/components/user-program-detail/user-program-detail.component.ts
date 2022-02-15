import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Excersize } from 'src/app/common/excersize';
import { Workout } from 'src/app/common/workout';
import { Program } from 'src/app/common/program';
import { ProgramDetail } from 'src/app/common/program-detail';

@Component({
  selector: 'app-user-program-detail',
  templateUrl: './user-program-detail.component.html',
  styleUrls: ['./user-program-detail.component.scss'],
})
export class UserProgramDetailComponent implements OnInit {
  id: number;

  constructor(private route:ActivatedRoute,private httpClient: HttpClient,  private toastController: ToastController) { }
  products: Map<BigInteger,Array<ProgramDetail>>;
  ngOnInit() {this.route.paramMap.subscribe(() => {
    this.getExcersizes(1);
  });}
  private baseUrl1 = 'http://localhost:8080/api/programs/getUserPrograms';
  getExcersizes(weekId){
    console.log("data");
    this.id = +this.route.snapshot.paramMap.get('id');
    this.httpClient.get<Map<BigInteger,Array<ProgramDetail>>>(`${this.baseUrl1}/${this.id}/${weekId}`).subscribe(this.processResult());
  }
  callme(eevnt){
    // const progName = this.programCreationForm.get('"+id+"').value;
    //  console.log(eevnt);
     var value=eevnt.detail.value;
     console.log(value);
    this.getExcersizes(value);
   
   }
   asIsOrder(a, b) {
    return 1;
 }
  processResult() {
    return data => {
      console.log(data);
      this.products = data;
      console.log(JSON.stringify(this.products));
    };
  }
}
