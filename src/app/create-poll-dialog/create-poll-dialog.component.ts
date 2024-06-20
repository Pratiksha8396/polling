import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-create-poll-dialog',
  templateUrl: './create-poll-dialog.component.html',
  styleUrls: ['./create-poll-dialog.component.scss'],
})
export class CreatePollDialogComponent implements OnInit {
  pollForm!: FormGroup;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.pollForm = this.formBuilder.group({
      id: [Math.floor(Math.random() * (10000 - 1 + 1)) + 1],
      poll: this.formBuilder.array([]),
    });
    (this.pollForm.get('poll') as FormArray).push(this.buildPollArray());
    console.log(this.pollForm.value);
  }

  buildPollArray() {
    return this.formBuilder.group({
      question: ['', Validators.required],
      options: [[], Validators.required],
      answer: ['']
    });
  }

  get pollsFormArray(): FormArray {
    return this.pollForm.get('poll') as FormArray;
  }

  add(event: MatChipInputEvent, index: number): void {
    const value = (event.value || '').trim();
    if (value) {
      let values = [];
      values = this.pollsFormArray.at(index).get('options')?.value;
      values.push(value);
      this.pollsFormArray.at(index).get('options')?.setValue(values);
    }
    event.chipInput!.clear();
  }

  createPoll() {
    let savedPoll = [];
    savedPoll = JSON.parse(localStorage.getItem('savedPolls') || '[]');
    savedPoll.push(this.pollForm.getRawValue());
    localStorage.setItem('savedPolls', JSON.stringify(savedPoll));
  }

  addQuestion() {
    this.pollsFormArray.push(this.buildPollArray());
  }

  remove(index: number): void {
    if (index >= 0) {
      this.pollsFormArray.at(index).get('options')?.value.splice(index, 1);
    }
  }
}
