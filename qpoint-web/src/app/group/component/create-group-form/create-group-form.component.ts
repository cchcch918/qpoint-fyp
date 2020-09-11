import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {HttpClient} from "@angular/common/http";
import {GroupService} from "../../service/group.service";

@Component({
  selector: 'app-create-group-form',
  templateUrl: './create-group-form.component.html',
  styleUrls: ['./create-group-form.component.css']
})
export class CreateGroupFormComponent implements OnInit {

  @Input() adminId: number;

  createGroupForm: FormGroup;
  createGroupLoading: boolean;

  constructor(private fb: FormBuilder, private groupService: GroupService, private modalService: NzModalService, private http: HttpClient, private msg: NzMessageService) {
  }

  ngOnInit(): void {
    this.createGroupForm = this.fb.group({
      groupName: [null, [Validators.required]],
    });
  }

  submitForm() {
    this.createGroupLoading = true;
    let payload = {
      groupName: this.createGroupForm.controls['groupName'].value,
      createdByAdminId: this.adminId
    }
    this.groupService.createNewGroup(payload).subscribe(res => {
        if (res) {
          this.createGroupLoading = false;
          this.createGroupForm.reset();
          this.msg.success(`Group ${payload.groupName} created`);
          this.groupService.sendCreateGroupEvent();

        }
      },
      error => {
        this.createGroupLoading = false;
        this.msg.error('Please try again later' + error.errorMessage);
      })
  }

}
