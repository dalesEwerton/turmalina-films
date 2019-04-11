import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnarieComponent } from './questionnarie.component';

describe('QuestionnarieComponent', () => {
  let component: QuestionnarieComponent;
  let fixture: ComponentFixture<QuestionnarieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionnarieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnarieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
