import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Excersize } from 'src/app/common/excersize';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProgramRequestPayload } from 'src/app/common/program-request.payload';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { WorkoutRequestPayload } from 'src/app/common/workout-request.payload';

@Component({
  selector: 'app-excersize-list',
  templateUrl: './excersize-list.component.html',
  styleUrls: ['./excersize-list.component.scss'],
})
export class ExcersizeListComponent implements OnInit {
  workoutRequestPayload: WorkoutRequestPayload;
  constructor(private route:ActivatedRoute,private httpClient: HttpClient,  private toastController: ToastController) {
    this.workoutRequestPayload = {
      workoutName: '',
      ids: []
    };
   }
  products: Excersize[];
  workoutCreationForm: FormGroup;
  ids: Array<Number>=[];
 
  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.getExcersizes();
    });
    this.workoutCreationForm = new FormGroup({
      workoutName: new FormControl('', Validators.required)
         });
  }
  saveWorkout(){
    const progName = this.workoutCreationForm.get('workoutName').value;
    console.log("Your Entered Program = "+progName+" ids = "+this.ids);
    this.workoutRequestPayload.workoutName= progName;
    this.workoutRequestPayload.ids = this.ids;
    this.save(this.workoutRequestPayload).subscribe(data=>{
      console.log("calling presentSuccessSaveToast with "+data)
      this.presentSuccessSaveToast(data);
    })
  }
  async presentSuccessSaveToast(data: String) {
   
    const toast = await this.toastController.create({
     
      message: ''+data,
      duration: 2000
    });
    toast.present();
  }
  save(workoutRequestPayload: WorkoutRequestPayload): Observable<String>{
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.httpClient.post<String>(`${this.baseUrl}/saveWorkout`,
    workoutRequestPayload,{ responseType: 'text' as 'json'  });
  }
  private baseUrl = 'http://localhost:8080/api/programs';
  private baseUrl1 = 'http://localhost:8080/api/excersizes';
  getExcersizes(){
    console.log("data");
     this.httpClient.get<Excersize[]>(`${this.baseUrl1}`).subscribe(this.processResult());
  }
  update_state(eevnt,id){
   // const progName = this.programCreationForm.get('"+id+"').value;
    console.log("data = "+id);
    this.ids.push(id);
  }
  processResult() {
    return data => {
      console.log(data);
      this.products = data._embedded.excersizes;
      console.log(JSON.stringify(this.products));
    };
  }
}
