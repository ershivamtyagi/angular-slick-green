import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Excersize } from 'src/app/common/excersize';

@Component({
  selector: 'app-create-excersize',
  templateUrl: './create-excersize.component.html',
  styleUrls: ['./create-excersize.component.scss'],
})
export class CreateExcersizeComponent implements OnInit {

  excersize: FormGroup;
  constructor(private modalCtrl: ModalController, private httpClient: HttpClient) {
    this.excersizeObj = {
      id: null,
      name: '',
      mainMuscleGrp: '',
      sets: null,
      regim: '',
      excersize: '',
      excersizeDescription: '',
      type: '',
      equipment: '',
      level: '',
      sport: '',
      force: '',
      variations: '',
      mechanicsType: '',
      otherMuscleGrp: ''
    };
  }

  ngOnInit() {
    this.excersize = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      equipement: new FormControl('', Validators.required),
      mechanicsType: new FormControl('', Validators.required),
      level: new FormControl('', Validators.required),
      force: new FormControl('', Validators.required),
      variation: new FormControl('', Validators.required),
      otherMucles: new FormControl('', Validators.required),
      regim: new FormControl('', Validators.required),
      mainMuscleGrp:new FormControl('', Validators.required)
    });
  }
  types: string[] = ['Strength'];
  levels: string[] = ['Beginner', 'Intermediate', 'Expert'];
  forces: string[] = ['Push', 'Pull'];
  mechanicsTypes: string[] = ['Compound', 'Isolation'];
  equipements: string[] = ['Cable', 'Dumbbell','Barbell'];
  regims: string[] = ['Zym', 'Yoga'];
  sports: string[]=['Yes','No'];

  excersizeObj: Excersize;
  private baseUrl11 = 'http://localhost:8080/api/excersizes';
  validateAllFormFields(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      }
    });
  }
  createExcersize() {
    if (!this.excersize.valid) {
      console.log('form is not valid'+this.excersize.valid);
      this.validateAllFormFields(this.excersize);
      return;
    }
    console.log(this.excersize.value)
    console.log("calling createExcersize()")

    this.excersizeObj.name = this.excersize.get('name').value;
    this.excersizeObj.excersizeDescription = this.excersize.get('description').value;
    this.excersizeObj.type = this.excersize.get('type').value;
    this.excersizeObj.equipment = this.excersize.get('equipement').value;
    this.excersizeObj.mechanicsType = this.excersize.get('mechanicsType').value;
    this.excersizeObj.level = this.excersize.get('level').value;
    this.excersizeObj.force = this.excersize.get('force').value;
    this.excersizeObj.variations = this.excersize.get('variation').value;
    this.excersizeObj.otherMuscleGrp = this.excersize.get('otherMucles').value;
    this.excersizeObj.regim = this.excersize.get('regim').value;
    this.excersizeObj.mainMuscleGrp = this.excersize.get('mainMuscleGrp').value;

    this.httpClient.post<Excersize>(`${this.baseUrl11}`, this.excersizeObj)
      .subscribe(this.processDataExcersize());

  }

  processDataExcersize() {

    return (data) => {
      this.excersizeObj = data;
      console.log(this.excersizeObj);
      this.dismiss();
    };
  }
  dismiss() {
    this.modalCtrl.dismiss(this.excersizeObj.name);
  }
}
