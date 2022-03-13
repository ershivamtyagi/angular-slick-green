import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Excersize } from 'src/app/common/excersize';
import { ExcersizeHistory } from 'src/app/common/excersize-history';

@Component({
  selector: 'app-show-workout',
  templateUrl: './show-workout.component.html',
  styleUrls: ['./show-workout.component.scss'],
})
export class ShowWorkoutComponent implements OnInit {
  category: any;
  logWorkout: FormGroup;
  constructor( private toastController: ToastController,private route:ActivatedRoute,private httpClient: HttpClient) {
    this.route.queryParams.subscribe(params => {
      this.category = params['category'];
  });
   }
  id: number;
  ngOnInit() {
    this.logWorkout = new FormGroup({
      weight: new FormControl('', Validators.required),
      sets: new FormControl('',Validators.required)
    });
    this.route.paramMap.subscribe(() => {
      this.getExcersizes();
  });}
  products: [];
  private baseUrl1 = 'http://localhost:8080/api/workouts';
  getExcersizes(){
    console.log("data");
    this.id = +this.route.snapshot.paramMap.get('categoryId');
     this.httpClient.get<Excersize[]>(`${this.baseUrl1}/${this.id}/${this.category}`).subscribe(this.processResult());
  }
  req=Array<ExcersizeHistory>();
  getMe(event,set){
    // console.log(event);
     console.log(set);
   // this.map.set(id,event.detail.value);
    //  const eh = new ExcersizeHistory();
    // eh.excersizeId=set.id;
    // eh.weight=event.detail.value;
    // eh.reps=set.reps;
    // eh.rest=set.rest;
    // eh.userId=45;
    // eh.date=new Date();
    // // console.log(this.map);
    // this.req.push(eh);
     }
     onSubmit(logWorkout){
      //  //console.log(this.map);
      // const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
      // return this.httpClient.post<String>('http://localhost:8080/api/excersizeHistory/set'
      // ,
      // this.req,      { responseType: 'text' as 'json'  }).subscribe(data=>{
      //   console.log("calling presentSuccessSaveToast with "+data)
      //   this.presentSuccessSaveToast(data);
      // });
    }
    async presentSuccessSaveToast(data: String) {
   
      const toast = await this.toastController.create({
       
        message: ''+data,
        duration: 2000
      });
      toast.present();
    }
  processResult() {
    return data => {
      console.log(data);
      this.products = data;
    };
  }
}
