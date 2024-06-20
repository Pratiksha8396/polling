import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerPollDialogComponent } from './answer-poll-dialog.component';

describe('AnswerPollDialogComponent', () => {
  let component: AnswerPollDialogComponent;
  let fixture: ComponentFixture<AnswerPollDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerPollDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerPollDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
