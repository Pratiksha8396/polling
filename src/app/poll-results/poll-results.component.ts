import { Component, OnInit } from '@angular/core';
import { Poll, ResultOptions, ResultPoll } from '../entities/polling.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poll-results',
  templateUrl: './poll-results.component.html',
  styleUrls: ['./poll-results.component.scss'],
})
export class PollResultsComponent implements OnInit {
  polls: Poll[] = [];
  seggregatedPolls!: any;
  selectedPoll: any;
  resultPolls: ResultPoll[] = [];
  constructor(private router: Router) {}

  ngOnInit(): void {
    const polls = localStorage.getItem('polls');
    this.seggregatedPolls = this.separateById(polls ? JSON.parse(polls) : []);
    this.selectedPoll = 0;
    this.getResults();
  }

  separateById(items: Poll[]): { [key: number]: Poll[] } {
    const result: { [key: string]: Poll[] } = {};

    items.forEach((item: Poll) => {
      if (!result[item.id]) {
        result[item.id] = [];
      }
      result[item.id].push(item);
    });

    return Object.values(result);
  }

  selectPoll(index: number) {
    this.selectedPoll = index;
    this.getResults();
  }

  getResults() {
    let resultPoll: ResultPoll;
    this.resultPolls = this.countAnswers(
      this.seggregatedPolls[this.selectedPoll]
    );
  }

  countAnswers(pollData: Poll[]) {
    const answerCountMap: Record<string, Record<string, number>> = {};
    pollData.forEach(({ poll }) => {
      poll.forEach(({ question, options }) => {
        if (!answerCountMap[question]) {
          answerCountMap[question] = {};
          options.forEach((option) => {
            answerCountMap[question][option] = 0;
          });
        }
      });
    });

    pollData.forEach(({ poll }) => {
      poll.forEach(({ question, answer }) => {
        if (
          answer &&
          answerCountMap[question] &&
          answerCountMap[question][answer] !== undefined
        ) {
          answerCountMap[question][answer]++;
        }
      });
    });

    const result: any[] = Object.entries(answerCountMap).map(
      ([question, optionsMap]) => {
        const options = Object.entries(optionsMap).map(([option, count]) => ({
          option,
          count,
        }));
        return { question, options };
      }
    );

    return result;
  }

  getPercentage(count: number, options: ResultOptions[]) {
    let total = 0;
    options.forEach((options) => (total = total + options.count));
    return (count / total) * 100;
  }

  back() {
    this.router.navigate(['/']);
  }
}
