import { Component, OnInit } from "@angular/core";

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import { Program } from "src/app/common/program";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Excersize } from "src/app/common/excersize";
import { Workout } from "src/app/common/workout";
import { AuthService } from "src/app/services/auth/shared/auth.service";
import { Diet } from "src/app/common/diet";
import { SaveProgramRequest } from "src/app/common/save-program-request";
import { ProgramDetail } from "src/app/common/program-detail";
import { ToastController } from "@ionic/angular";
/**
 * @title Stepper that displays errors in the steps
 */

@Component({
  selector: "app-create-program",
  templateUrl: "./create-program.component.html",
  styleUrls: ["./create-program.component.scss"],
})
export class CreateProgramComponent implements OnInit {
  programFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  dietFormGroup: FormGroup;

  progamObj: Program;
  workouts: Workout[];

  finalObjectTOPost = new SaveProgramRequest();
  diets: Diet[];

  program: Program;
  constructor(
    private auth: AuthService,
    private _formBuilder: FormBuilder,
    private route: Router,
    private httpClient: HttpClient,
    private toastController: ToastController
  ) { }

  week_days = [
    "Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"
  ]
  ngOnInit() {
    this.getUserWorkouts();
    this.getUserDiets();
    this.programFormGroup = new FormGroup({
      programName: new FormControl("", Validators.required),
      programRange: new FormControl("", Validators.required),
    });

    this.secondFormGroup = this._formBuilder.group({
      workoutForMon: ["", Validators.required],
      workoutForTue: ["", Validators.required],
      workoutForWed: ["", Validators.required],
      workoutForThr: ["", Validators.required],
      workoutForFri: ["", Validators.required],
      workoutForSat: ["", Validators.required],
      workoutForSun: ["", Validators.required],
    });


    this.dietFormGroup = this._formBuilder.group({
      dietForMon: ["", Validators.required],
      dietForTue: ["", Validators.required],
      dietForThr: ["", Validators.required],
      dietForWed: ["", Validators.required],
      dietForFri: ["", Validators.required],
      dietForSat: ["", Validators.required],
      dietForSun: ["", Validators.required],
    });
  }
  programDetails: Array<ProgramDetail>;
  save() {
    finalObjectTOPost: SaveProgramRequest;
    if (this.programFormGroup.valid) {

      // or you should have the condition based on your requirement
      //setting program Info

      this.finalObjectTOPost.programName = this.programFormGroup.get('programName').value;
      this.finalObjectTOPost.programRange = this.programFormGroup.get('programRange').value;

    }

    console.log("printing second from items");
    if (this.secondFormGroup.valid) {
      console.log(this.secondFormGroup.value);

      // for(let weekDay of this.week_days){

      // }
      this.week_days.forEach((value, index) => {
        console.log(index); // 0, 1, 2
        console.log(value); // 9, 2, 5
        this.finalObjectTOPost.programDetails.push(new ProgramDetail(null,"W",this.secondFormGroup.get("workoutFor" + value).value.id,index+1));
      });




    }

    if (this.dietFormGroup.valid) {
      this.dietFormGroup.get("dietForMon").value;
      this.dietFormGroup.get("dietForTue").value;
      this.dietFormGroup.get("dietForWed").value;
      this.dietFormGroup.get("dietForThr").value;
      this.dietFormGroup.get("dietForFri").value;
      this.dietFormGroup.get("dietForSat").value;
      this.dietFormGroup.get("dietForSun").value;
      this.week_days.forEach((value, index) => {
        console.log(index); // 0, 1, 2
        console.log(value); // 9, 2, 5
        this.finalObjectTOPost.programDetails.push(new ProgramDetail(null,"D",this.dietFormGroup.get("dietFor" + value).value.id,index+1));
      });
    }
    console.log(this.finalObjectTOPost);
    this.httpClient
    .post<String>(`${this.baseUrl3}`,this.finalObjectTOPost,{ responseType: 'text' as 'json'  })
    .subscribe(this.processResult2());
    return;
  }

  un: string = this.auth.getUserName();
  baseUrl1 = "http://localhost:8080/api/workouts/getUserWorkout";
  baseUrl2 = "http://localhost:8080/api/diets/getUserDiets";
  baseUrl3 = "http://localhost:8080/api/programs";
  getUserWorkouts() {
    this.httpClient
      .get<Workout[]>(`${this.baseUrl1}`)
      .subscribe(this.processResult());
  }
  getUserDiets() {
    this.httpClient
      .get<Diet[]>(`${this.baseUrl2}`)
      .subscribe(this.processResult1());
  }

  processResult() {
    return (data) => {
      console.log(data);
      this.workouts = data;
      console.log(JSON.stringify(this.workouts));
    };
  }
  
  processResult1() {
    return (data) => {
      console.log(data);
      this.diets = data;
    };
  }
response:string;
  processResult2() {
    return (data) => {
      console.log(data);
      this.presentSuccessSaveToast(data);
      this.route.navigateByUrl('');
    };
  }
  async presentSuccessSaveToast(data: String) {
   
    const toast = await this.toastController.create({
     
      message: ''+data,
      duration: 2000
    });
    toast.present();
  }
  getWorkoutName(workout: Workout) {
    return workout.name;
  }
  getDietName(diet: Diet) {
    return diet.name;
  }
}
