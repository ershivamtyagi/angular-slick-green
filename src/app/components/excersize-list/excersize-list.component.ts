import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Excersize } from 'src/app/common/excersize';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProgramRequestPayload } from 'src/app/common/program-request.payload';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-excersize-list',
  templateUrl: './excersize-list.component.html',
  styleUrls: ['./excersize-list.component.scss'],
})
export class ExcersizeListComponent implements OnInit {
  programRequestPayload: ProgramRequestPayload;
  constructor(private route:ActivatedRoute,private httpClient: HttpClient,  private toastController: ToastController) {
    this.programRequestPayload = {
      programName: '',
      ids: []
    };
   }
  products: Excersize[];
  programCreationForm: FormGroup;
  ids: Array<Number>=[];
 
  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.getExcersizes();
    });
    this.programCreationForm = new FormGroup({
      programName: new FormControl('', Validators.required)
         });
  }
  saveProgram(){
    const progName = this.programCreationForm.get('programName').value;
    console.log("Your Entered Program = "+progName+" ids = "+this.ids);
    this.programRequestPayload.programName= progName;
    this.programRequestPayload.ids = this.ids;
    this.save(this.programRequestPayload).subscribe(data=>{
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
  save(programRequestPayload: ProgramRequestPayload): Observable<String>{
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.httpClient.post<String>(`${this.baseUrl}/saveProgram`,
    programRequestPayload,{ responseType: 'text' as 'json'  });
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
