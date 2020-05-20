import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {StudentService} from "../../service/student.service";
import {StudentQrVoModel} from "../../model/student-qr-vo.model";
import {NzMessageService} from "ng-zorro-antd";
import * as JsPdf from 'jspdf';

@Component({
  selector: 'app-student-qrcode-list',
  templateUrl: './student-qrcode-list.component.html',
  styleUrls: ['./student-qrcode-list.component.css']
})
export class StudentQrcodeListComponent implements OnInit {
  studentQrList: StudentQrVoModel[];
  searchStudentName: string;
  qrCodeIsLoading: boolean;
  downloadIsLoading: boolean


  @ViewChild('downloadContent', {static: false}) downloadContent: ElementRef;

  constructor(private studentService: StudentService, private message: NzMessageService) {
  }

  ngOnInit(): void {
    this.qrCodeIsLoading = true
    this.studentService.showAllStudentsQrCode().subscribe(res => {
      if (res) {
        this.studentQrList = res;
        this.qrCodeIsLoading = false
      }
    })
  }

  createCopySuccessMessage(studentName: string) {
    this.message.create('success', studentName + `'s Qr Code copied! `);
  }

  downloadPdf() {
    this.downloadIsLoading = true;
    let doc = new JsPdf();
    doc.fromHTML(this.downloadContent.nativeElement.innerHTML, 15, 15, {
      'width': 190,
      'elementHandlers': {
        '#editor': (element, renderer) => {
          return true
        }
      }
    }, () => {
      this.downloadIsLoading = false;
      doc.save("students.pdf");
    })
  }
}
