import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Excersize } from 'src/app/common/excersize';
import { ExcersizeListResponse } from 'src/app/common/excersize-list-response';
import { ExcersizeService } from 'src/app/services/excersize.service';
import { BASE_URL } from 'src/environments/environment';


@Component({
  selector: 'app-save-workout',
  templateUrl: './save-workout.component.html',
  styleUrls: ['./save-workout.component.scss'],
})
export class SaveWorkoutComponent implements OnInit {

  workout: FormGroup;
  baseUrl3 = 'http://localhost:8080/api/workouts';
  products: ExcersizeListResponse[];

  constructor(private httpClient: HttpClient,
    private toastController: ToastController,
    private route: Router,private excersizeService:ExcersizeService) { }

  ngOnInit() {
    const newLocal_1 = this.initExcersizes();
    this.getExcersizess();
    newLocal_1.get('sno').patchValue(this.val++);
    this.workout = new FormGroup({
      name: new FormControl('', Validators.required),
      excersizes: new FormArray([newLocal_1])
    });
  }

  initExcersizes() {
    return new FormGroup({
      //selling_points: this.fb.array([this.fb.group({point:''})])
      sno: new FormControl(''),
      excersizeName: new FormControl(''),
      excersizeDescription: new FormControl(''),
      sets: new FormArray([
        // this.initSet()
      ])
    });
  }
  val: number = 1;
  // public patchValue(sno): void {
  //   // const obj = {
  //   //   displayNsnoame: "   9999999999    ",
  //   //   propertyName: "9999999999",
  //   //   propertySourceId: "9999999999",
  //   //   propertyValue: "9999999999",
  //   //   propertyNamespace: "9999999999"
  //   // };
  //   // Không có lỗi
  //   this.workout.patchValue({
  //     sno: this.val
  //   });
  // }

  initSet() {
    return new FormGroup({
      reps: new FormControl(''),
      rest: new FormControl(''),
      weight: new FormControl('')
    });
  }
  initSetWithDefaults(i, j, k) {
    return new FormGroup({
      reps: new FormControl(i),
      rest: new FormControl(j),
      weight: new FormControl(k)
    });
  }
  addExcersize() {
    const control = <FormArray>this.workout.get('excersizes');
    const newLocal = this.initExcersizes();
    if (this.val < 1) {
      this.val = 1;
    }
    newLocal.get('sno').patchValue(this.val++);
    control.push(newLocal);
  }
  addSet(j) {
    console.log("Add sets = " + j);
    const control = <FormArray>this.workout.get('excersizes')['controls'][j].get('sets');
    // console.log(control);
    control.push(this.initSet());

  }
  copySet(i, j) {
    console.log("Coping=" + i + ", " + j);
    const control1 = <FormArray>this.workout.get('excersizes')['controls'][i].get('sets');
    const control = <FormArray>this.workout.get('excersizes')['controls'][i].get('sets')['controls'][j];
    control1.push(this.initSetWithDefaults(control.get('reps').value, control.get('rest').value, control.get('weight').value));
  }
  getExcersizes(form) {
    //console.log(form.get('sections').controls);
    return form.controls.excersizes.controls;
  }
  getSets(form) {
    //console.log(form.controls.questions.controls);
    return form.controls.sets.controls;
  }

  // removeSets(j) {
  //   console.log("removing at index = "+j);
  //   const control = <FormArray>this.workout.get('excersizes')['controls'][j].get('sets');
  //   control.removeAt(j);
  // }
  removeSet(j, i) {
    console.log("removing at index = " + j + "," + i);
    const control = <FormArray>this.workout.get('excersizes')['controls'][j].get('sets');
    // control.removeAt(j);
    //const control =  <FormArray>this.survey.get(['sections',i,'questions',j,'options']);
    console.log(control);
    control.removeAt(i);
    //  control.controls = [];
  }
  move(shift, currentIndex) {
    const control = <FormArray>this.workout.get('excersizes');

    let newIndex: number = currentIndex + shift;
    if (newIndex === -1) {
      newIndex = control.length - 1;
    } else if (newIndex == control.length) {
      newIndex = 0;
    }

    const currentGroup = control.at(currentIndex);
    control.removeAt(currentIndex);
    control.insert(newIndex, currentGroup)
  }

  removeExcersize(i) {
    --i;
    this.val--;
    console.log(i);
    const control = <FormArray>this.workout.get('excersizes');
    control.removeAt(i);

  }
  onSubmit(form) {
    console.log("submit called");
    console.log(form.value);
    this.httpClient
      .post<String>(`${this.baseUrl3}`, form.value, { responseType: 'text' as 'json' })
      .subscribe(this.processResult2());
  }
   baseUrl1:string =BASE_URL+'/excersizes';
   baseUrl2= 'http://localhost:8080/api/excersizes';

  private baseUrl11 = 'http://localhost:8080/api/excersizes';
  getExcersizess(){
    console.log("data");
    this.httpClient.get<ExcersizeListResponse[]>(`${this.baseUrl11}`).subscribe(this.processResult());
  }
  processResult() {
    return data => {
      console.log(data);
      this.products = data._embedded.excersizes;
      console.log(JSON.stringify(this.products));
    };
  }
  excersizeResponseList:ExcersizeListResponse[];
  processData() {
    console.log("called")
    return (data) => {
      console.log(data);
      this.excersizeResponseList=data.excersizes;
    };
  }
  processResult2() {
    return (data) => {
      console.log(data);
      this.presentSuccessSaveToast(data);
      this.route.navigateByUrl('');
    };
  }
  async presentSuccessSaveToast(data: String) {

    const toast = await this.toastController.create({

      message: '' + data,
      duration: 2000
    });
    toast.present();
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