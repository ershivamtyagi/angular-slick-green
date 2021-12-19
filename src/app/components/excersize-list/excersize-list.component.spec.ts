import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExcersizeListComponent } from './excersize-list.component';

describe('ExcersizeListComponent', () => {
  let component: ExcersizeListComponent;
  let fixture: ComponentFixture<ExcersizeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcersizeListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExcersizeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
