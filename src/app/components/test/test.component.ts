import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Excersize } from 'src/app/common/excersize';
export interface Set {
  id: number;
  reps: number;
  rest: string;
  weight: number;
}

export interface RootObject {
  id: number;
  name: string;
  mainMuscleGrp: string;
  regim: string;
  sets: Set[];
  type: string;
  equipment: string;
  level: string;
  sport: string;
  force?: any;
  variations: string;
  mechanicsType?: any;
  otherMuscleGrp?: any;
}
export interface ServerResponse {
  books: any;
}
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})

export class TestComponent implements OnInit {
  category: any;
  myForm: FormGroup;
  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private alertController: AlertController
  ) {
    this.route.queryParams.subscribe(params => {
      this.category = params['category'];
      this.getExcersizes();
    });

    this.myForm = formBuilder.group({});


  }
  id: number;
  ngOnInit() {

  }

  products: Array<RootObject>;
  private baseUrl1 = 'http://localhost:8080/api/workouts';
  getExcersizes() {
    // console.log("data");
    this.id = +this.route.snapshot.paramMap.get('categoryId');
    // console.log("category" + this.category);
    const newLocal = `${this.baseUrl1}/${this.id}/${this.category}`;
    // console.log(JSON.stringify(newLocal));
    this.httpClient.get<Excersize[]>(newLocal).subscribe(this.processResult());
  }
  processResult() {
    return data => {
      // console.log(data);
      this.products = data;
      this.createControls(this?.products);
    };
  }

  createControls(controls: Array<RootObject>) {
    // var count=0;
    const newExcersizeArray = new FormArray([]);
    for (let control of controls) {
      // const newFormControl= new FormControl();
      // this.myForm.addControl(control.id+"",newFormControl);

      const newExcersizeGrp = new FormGroup({});
      const newSetsArray = new FormArray([]);
      const newSetGroup = new FormGroup({});
      const newExcersizeNameControl = new FormControl();
      // const newExcersizeSnoControl = new FormControl();
      newExcersizeNameControl.patchValue(control.name);
      // newExcersizeSnoControl.patchValue(++count);
      // newExcersizeGrp.addControl("sno",newExcersizeSnoControl);

      newExcersizeGrp.addControl("excersizeName", newExcersizeNameControl);

      control.sets.map(child => {
        const newWeightControl = new FormControl('', Validators.required);
        const newRepsControl = new FormControl('', Validators.required);
        const newRestControl = new FormControl('', Validators.required);
        newWeightControl.patchValue(child.weight);
        newRepsControl.patchValue(child.reps);
        newRestControl.patchValue(child.rest);
        newSetGroup.addControl("weight", newWeightControl);
        newSetGroup.addControl("rest", newRestControl);
        newSetGroup.addControl("reps", newRepsControl);
        newSetsArray.push(newSetGroup);
      })
      newExcersizeGrp.addControl("sets", newSetsArray);
      newExcersizeArray.push(newExcersizeGrp);
    }

    this.myForm.addControl("excersizes", newExcersizeArray);
    // console.log(this.myForm);
  }
  getFormArray(i) {
    return <FormArray>this.myForm.get('excersizes')['controls'][i].get('sets');
  }
  baseUrl3='http://localhost:8080/api/excersizeHistory/save';
  async submitForm() {
    // const newLocal = this.alertController.create({
    //   header: 'Your Form',
    //   message: JSON.stringify(this.myForm.value),
    //   buttons: ['OK']
    // });
    // (await newLocal).present();
    // console.log("submit called");
    // console.log(this.myForm.value);
    this.httpClient
      .post<String>(`${this.baseUrl3}`, this.myForm.value, { responseType: 'text' as 'json' })
      .subscribe(this.processResult2());
    

  }
  processResult2() {
    return (data) => {
      // console.log(data);
    };
  }
}