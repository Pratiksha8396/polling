import { Component, OnInit } from '@angular/core';
import { defaultPolls } from './polls.const';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AnswerPollDialogComponent } from '../answer-poll-dialog/answer-poll-dialog.component';
import { CreatePollDialogComponent } from '../create-poll-dialog/create-poll-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss'],
})
export class PollComponent implements OnInit {
  polls: any[] = [];
  constructor(public dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.getAllPolls();
  }

  getAllPolls() {
    this.polls = localStorage.getItem('savedPolls')
      ? JSON.parse(localStorage.getItem('savedPolls') || '[]')
      : defaultPolls;
    localStorage.setItem('savedPolls', JSON.stringify(this.polls));
  }

  viewPollingResults() {
    this.router.navigate(['/results']);
  }

  answerPoll(index: number) {
    const dialogConfig = Object.assign(new MatDialogConfig(), {
      data: this.polls[index],
      width: '55%',
      height: '60%',
      disableClose: true,
      autoFocus: false,
    });
    const dialogRef = this.dialog.open(AnswerPollDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllPolls();
    });
  }

  createNewPoll() {
    const dialogConfig = Object.assign(new MatDialogConfig(), {
      width: '55%',
      height: '100%',
      disableClose: true,
      position: { top: '0', right: '0' },
      autoFocus: false,
    });
    const dialogRef = this.dialog.open(CreatePollDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllPolls();
    });
  }
}
