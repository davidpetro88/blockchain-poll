import {Component, OnInit} from '@angular/core';
import {Poll, PollForm, PollVote} from "./types";
import {PollService} from "./poll-service/poll.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'blockchain-poll';
  showForm = false;
  activePoll?: Poll;

  polls = this.ps.getPolls();

  constructor(private ps: PollService) {}

  ngOnInit() {
    console.log('init!!');
    this.ps.onEvent('PollCreated').subscribe(() => {
      console.log('change!!!')
      this.polls = this.ps.getPolls();
    });
  }

  setActivePoll(poll: Poll) {
    this.activePoll = undefined;

    setTimeout(() => {
      this.activePoll = poll;
    }, 100);
  }

  handlePollCreate(poll: PollForm) {
    this.ps.createPoll(poll);
  }

  handlePollVote(pollVoted: PollVote) {
    this.ps.vote(pollVoted.id, pollVoted.vote);
  }
}
