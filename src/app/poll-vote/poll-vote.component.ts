import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import ApexCharts from 'apexcharts';
import {PollVote} from "../types";

@Component({
  selector: 'app-poll-vote',
  templateUrl: './poll-vote.component.html',
  styleUrls: ['./poll-vote.component.scss']
})
export class PollVoteComponent implements AfterViewInit {
  @Input() id?: number;
  @Input() question?: string;
  @Input() voted?: boolean;
  @Input() options?: string[];
  @Input() results?: number[];
  @Output() pollVoted: EventEmitter<PollVote> = new EventEmitter<PollVote>();

  voteForm: FormGroup = this.fb.group({
    selected: new FormControl('', Validators.required)
  });

  constructor(private fb: FormBuilder) { }

  ngAfterViewInit(): void {
    if (this.voted) {
      this.generateChart();
    }
  }

  submitForm(): void {
    const pollVoted: PollVote = {
      id: this.id!,
      vote: this.voteForm.get('selected')?.value
    }
    this.pollVoted.emit(pollVoted);
  }

  generateChart(): void {
    const options: ApexCharts.ApexOptions = {
      series: [
        {
          data: this.results || []
        }
      ],
      chart: {
        height: 350,
        type: 'bar'
      },
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true
        }
      },
      legend: {
        show: false
      },
      xaxis: {
        categories: this.options
      }
    }

    const chart = new ApexCharts(document.getElementById('poll-results'), options);
    chart.render();
  }

}
