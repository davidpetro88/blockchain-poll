import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PollForm} from "../types";

@Component({
  selector: 'app-poll-create',
  templateUrl: './poll-create.component.html',
  styleUrls: ['./poll-create.component.scss']
})
export class PollCreateComponent implements OnInit {

  @Output() pollCreated: EventEmitter<PollForm> = new EventEmitter();

  pollForm: FormGroup = this.fb.group({
    question: new FormControl('', Validators.required),
    image: new FormControl(''),
    opt1: new FormControl(''),
    opt2: new FormControl(''),
    opt3: new FormControl(''),
  });

  constructor(private fb: FormBuilder) { }

  // pollForm: FormGroup = this.
  submitForm(): void {
    const formData: PollForm = {
      question: this.pollForm.get('question')?.value,
      options: [
        this.pollForm.get('opt1')?.value,
        this.pollForm.get('opt2')?.value,
        this.pollForm.get('opt3')?.value
      ],
      thumbnail: this.pollForm.get('image')?.value
    }

    this.pollCreated.emit(formData);
  }

  ngOnInit(): void {
  }

}
