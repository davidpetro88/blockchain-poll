import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit {
  @Input() question?: string;
  @Input() image?: string;
  @Input() votes?: number[];
  @Input() voted?: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  numberOfVotes(): number {
    if(this.votes?.length) {
      return this.votes.reduce((acc, curr) => acc += curr);
    }
    return 0;
  }

}
