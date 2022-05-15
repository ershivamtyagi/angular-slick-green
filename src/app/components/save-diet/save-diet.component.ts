import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController, PopoverController, ModalController } from '@ionic/angular';
import { ExcersizeListResponse } from 'src/app/common/excersize-list-response';
import { BASE_URL } from 'src/environments/environment';
import { CreateExcersizeComponent } from '../create-excersize/create-excersize.component';
import { ExersizePopoverComponent } from '../exersize-popover/exersize-popover.component';

@Component({
  selector: 'app-save-diet',
  templateUrl: './save-diet.component.html',
  styleUrls: ['./save-diet.component.scss'],
})
export class SaveDietComponent implements OnInit {

  diet: FormGroup;
  baseUrl3 = 'http://localhost:8080/api/diets';
  //TODO
  products: ExcersizeListResponse[];
  items: string[];

  constructor(private httpClient: HttpClient,
    private toastController: ToastController,
    private route: Router,
    private popoverController: PopoverController,
    private modalController: ModalController) { }

  ngOnInit() {
    const newLocal_1 = this.initMeal();
  
    newLocal_1.get('sno').patchValue(this.val++);
    this.diet = new FormGroup({
      name: new FormControl('', Validators.required),
      meals: new FormArray([newLocal_1])
    });
  }

  initMeal() {
    return new FormGroup({
      //selling_points: this.fb.array([this.fb.group({point:''})])
      sno: new FormControl('',Validators.required),
      name: new FormControl('',Validators.required),
      ingridients: new FormArray([
        // this.initSet()
      ])
    });
  }

  val: number = 1;
  
  initIngridence() {
    return new FormGroup({
      name: new FormControl(''),
      calory: new FormControl(''),
      quantity: new FormControl('')
    });
  }
  initSetWithDefaults(i, j, k) {
    return new FormGroup({
      name: new FormControl(i),
      calory: new FormControl(j),
      quantity: new FormControl(k)
    });
  }
  //DOing
  addMeal() {
    const control = <FormArray>this.diet.get('meals');
    const newLocal = this.initMeal();
    if (this.val < 1) {
      this.val = 1;
    }
    newLocal.get('sno').patchValue(this.val++);
    control.push(newLocal);
  }
  addIngredients(j) {
    console.log("Add ingridient = " + j);
    const control = <FormArray>this.diet.get('meals')['controls'][j].get('ingridients');
    control.push(this.initIngridence());

  }
  copySet(i, j) {
    console.log("Coping=" + i + ", " + j);
    const control1 = <FormArray>this.diet.get('meals')['controls'][i].get('ingridients');
    const control = <FormArray>this.diet.get('meals')['controls'][i].get('ingridients')['controls'][j];
    control1.push(this.initSetWithDefaults(control.get('name').value, control.get('calory').value, control.get('quantity').value));
  }
  getExcersizes(form) {
    //console.log(form.get('sections').controls);
    return form.controls.excersizes.controls;
  }
  getIngredients(form) {
    //console.log(form.controls.questions.controls);
    return form.controls.ingridients.controls;
  }

  // removeSets(j) {
  //   console.log("removing at index = "+j);
  //   const control = <FormArray>this.workout.get('excersizes')['controls'][j].get('sets');
  //   control.removeAt(j);
  // }
  removeSet(j, i) {
    console.log("removing at index = " + j + "," + i);
    const control = <FormArray>this.diet.get('meals')['controls'][j].get('ingridients');
    // control.removeAt(j);
    //const control =  <FormArray>this.survey.get(['sections',i,'questions',j,'options']);
    console.log(control);
    control.removeAt(i);
    //  control.controls = [];
  }
  move(shift, currentIndex) {
    const control = <FormArray>this.diet.get('meals');

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

  removeMeal(i) {
    --i;
    this.val--;
    console.log(i);
    const control = <FormArray>this.diet.get('meals');
    control.removeAt(i);

  }
  onSubmit(form) {
    console.log("submit called");
    console.log(form.value);
    this.httpClient
      .post<String>(`${this.baseUrl}`, form.value, { responseType: 'text' as 'json' })
      .subscribe(this.processResult2());
  }
  // baseUrl1: string = BASE_URL + '/excersizes';
   baseUrl = 'http://localhost:8080/api/diets';

  // private baseUrl11 = 'http://localhost:8080/api/excersizes';
  getMeals(form) {
    //console.log(form.get('sections').controls);
    return form.controls.meals.controls;
  }
  
  processResult() {
    return data => {
      console.log(data);
      this.products = data._embedded.excersizes;
      console.log(JSON.stringify(this.products));
    };
  }
  excersizeResponseList: ExcersizeListResponse[];
  processData() {
    console.log("called")
    return (data) => {

      this.excersizeResponseList = data._embedded.excersizes;

    };
  }

  clickButton(name, i) {
    console.log(name);
    const control = <FormArray>this.diet.get('meals')['controls'][i].get('name');
    control.patchValue(name);

  }
  processResult2() {
    return (data) => {
      console.log(data);
      this.presentSuccessSaveToast(data);
      // this.route.navigateByUrl('');
    };
  }
  async presentSuccessSaveToast(data: String) {

    const toast = await this.toastController.create({

      message: '' + data,
      duration: 2000
    });
    toast.present();
  }
  // search 
  // triggerSearch() {

  // }
  // async yourSearchFunction(ev: any, i) {
  //   if(!this.flag)
  //       this.openExcersizeListPopover(ev, i);
  //   this.flag=false;

  // }
  private async openExcersizeListPopover(ev: any, i) {
    const popover = await this.popoverController.create({
      component: ExersizePopoverComponent,
      componentProps: {
        exList: this.excersizeResponseList,
        name: ev.target.value
      },
      event: ev

      
    });
    const currentPopover = popover;

    popover.present();
    currentPopover.onDidDismiss().then((result) => {
      const control = <FormArray>this.diet.get('meals')['controls'][i];
      if(result.data=='new'){
          this.openCreateSetModel(control);
      }
      control.get('name').patchValue(result.data);
      this.flag=true;
    });
  }
  flag:boolean=false;
  async openCreateSetModel(control) {
    const modal = await this.modalController.create({
      component: CreateExcersizeComponent,
      // componentProps: {
      //   exList: this.excersizeResponseList,
      //   name: ev.target.value
      // },
      // event: ev

      
    });
    modal.present();
    modal.onDidDismiss().then((result)=>{
      control.get('name').patchValue(result.data);
      this.flag=true;
    })
  }
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
  
}
