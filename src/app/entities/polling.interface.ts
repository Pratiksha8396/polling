export interface Poll {
  id: string;
  poll: PollingData[];
}

export interface PollingData {
  question: string;
  options: string[];
  answer?: string;
}

export interface ResultPoll {
  question: string;
  options: ResultOptions[];
}

export interface ResultOptions {
  option: string;
  count: number;
}
