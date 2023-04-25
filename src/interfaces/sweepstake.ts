type StringNumber = string | number;

export interface ISweepstake {
  id?: string;
  title: string;
  focus: string;
  raised: number;
  entries: number;
  statuses: string[];
  status: string;
  link: string;
  start_date: StringNumber;
  end_date: StringNumber;
}
