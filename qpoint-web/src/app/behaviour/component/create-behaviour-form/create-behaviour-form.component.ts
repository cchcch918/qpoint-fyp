import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BehaviourService} from "../../service/behaviour.service";
import {NzMessageService} from "ng-zorro-antd";

@Component({
  selector: 'app-create-behaviour-form',
  templateUrl: './create-behaviour-form.component.html',
  styleUrls: ['./create-behaviour-form.component.css']
})
export class CreateBehaviourFormComponent implements OnInit {
  createBehaviourLoading: boolean;
  createBehaviourForm: FormGroup;

  @Input() adminId: number;
  @Output() updateTableEvent: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder, private behaviourService: BehaviourService, private msg: NzMessageService,) {
  }

  ngOnInit(): void {
    this.createBehaviourForm = this.fb.group({
      behaviourName: [null, [Validators.required]],
      behaviourPoint: [null, [Validators.required]],
    });
  }

  submitForm() {
    this.createBehaviourLoading = true;
    let payload = {
      behaviourName: this.createBehaviourForm.controls['behaviourName'].value,
      behaviourPoint: this.createBehaviourForm.controls['behaviourPoint'].value,
      createdByAdminId: this.adminId
    }

    this.behaviourService.createNewBehaviour(payload).subscribe(res => {
        this.createBehaviourLoading = false;
        this.createBehaviourForm.reset();
        this.msg.success(`Behaviour ${payload.behaviourName} created`);
        this.updateTableEvent.emit(true);
      }
      ,
      error => {
        this.createBehaviourLoading = false;
        this.msg.error('Please try again later' + error.errorMessage);
      })
  }
}
