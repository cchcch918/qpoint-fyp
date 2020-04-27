import {Component, OnInit} from '@angular/core';
import {StudentService} from "../../service/student.service";
import {StudentQrModel} from "../../model/studentQr.model";
import {NzMessageService} from "ng-zorro-antd";

@Component({
  selector: 'app-student-qrcode-list',
  templateUrl: './student-qrcode-list.component.html',
  styleUrls: ['./student-qrcode-list.component.css']
})
export class StudentQrcodeListComponent implements OnInit {
  studentQrList: StudentQrModel[];
  searchStudentName: string;

  constructor(private studentService: StudentService, private message: NzMessageService) {
  }

  ngOnInit(): void {
    this.studentService.showAllStudentsQrCode().subscribe(res => {
      if (res) {
        this.studentQrList = res;
      }
    })
  }


  createCopySuccessMessage(studentName: string) {
    this.message.create('success', studentName + `'s Qr Code copied! `);

  }
}
