import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Poll, PollingData } from '../entities/polling.interface';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-answer-poll-dialog',
  templateUrl: './answer-poll-dialog.component.html',
  styleUrls: ['./answer-poll-dialog.component.scss'],
})
export class AnswerPollDialogComponent implements OnInit {
  pollForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Poll
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.generatePollingForm();
  }

  createForm() {
    this.pollForm = this.formBuilder.group({
      id: [''],
      poll: this.formBuilder.array([]),
    });
  }

  buildPollingForm() {
    return this.formBuilder.group({
      question: [''],
      options: [[]],
      answer: ['', Validators.required],
    });
  }

  generatePollingForm() {
    this.pollForm.get('id')?.patchValue(this.data.id);
    this.data.poll.forEach((poll: PollingData, pollIndex: number) => {
      (this.pollForm.get('poll') as FormArray).push(this.buildPollingForm());
      (this.pollForm.get('poll') as FormArray).at(pollIndex).patchValue(poll);
    });
  }

  get pollsFormArray(): FormArray {
    return this.pollForm.get('poll') as FormArray;
  }

  submitResponse() {
    let savedPoll = [];
    savedPoll = JSON.parse(localStorage.getItem('polls') || '[]');
    savedPoll.push(this.pollForm.getRawValue());
    localStorage.setItem('polls', JSON.stringify(savedPoll));
  }
}
