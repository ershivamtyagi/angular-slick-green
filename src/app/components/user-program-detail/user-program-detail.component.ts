import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Excersize } from 'src/app/common/excersize';

@Component({
  selector: 'app-user-program-detail',
  templateUrl: './user-program-detail.component.html',
  styleUrls: ['./user-program-detail.component.scss'],
})
export class UserProgramDetailComponent implements OnInit {
  id: number;

  constructor(private route:ActivatedRoute,private httpClient: HttpClient,  private toastController: ToastController) { }
  products: Excersize[];
  ngOnInit() {this.route.paramMap.subscribe(() => {
    this.getExcersizes();
  });}
  private baseUrl1 = 'http://localhost:8080/api/programs/getUserPrograms';
  getExcersizes(){
    console.log("data");
    this.id = +this.route.snapshot.paramMap.get('id');
     this.httpClient.get<Excersize[]>(`${this.baseUrl1}/${this.id}`).subscribe(this.processResult());
  }
  update_state(eevnt,id){
    // const progName = this.programCreationForm.get('"+id+"').value;
     console.log("data = "+id);
     
   }
  processResult() {
    return data => {
     // console.log(data);
      this.products = data;
     // console.log(JSON.stringify(this.products));
    };
  }
}
