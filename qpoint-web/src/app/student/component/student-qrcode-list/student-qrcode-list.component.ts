import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {StudentService} from "../../service/student.service";
import {StudentQrVoModel} from "../../model/student-qr-vo.model";
import {NzMessageService} from "ng-zorro-antd";
import html2canvas from "html2canvas";
import * as JSZip from "jszip";
import {saveAs} from '@progress/kendo-file-saver';


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
        this.studentQrList.forEach(studentQr => {
          if (studentQr.student.profileImagePath) {
            this.studentService.getStudentProfileImage(studentQr.student.profileImagePath).subscribe(res => {
              let reader = new FileReader();
              reader.addEventListener("load", () => {
                studentQr.image = reader.result;
              }, false);
              if (res) {
                reader.readAsDataURL(res);
              }
            })
          }
        })
      }
    })
  }

  createCopySuccessMessage(studentName: string) {
    this.message.create('success', studentName + `'s Qr Code copied! `);
  }

  async downloadStudent() {
    this.downloadIsLoading = true;
    let cardNumber = 0
    let promise = [];
    while (document.getElementById("downloadContent" + cardNumber) !== null) {
      cardNumber++
    }
    for (let i = 0; i < cardNumber; i++) {
      promise.push(this.generateCanvas(i))
    }
    this.imageToZip(await Promise.all(promise))
  }

  async generateCanvas(id: number) {
    let canvas = await html2canvas(document.getElementById("downloadContent" + id))
    const studentName = (document.getElementById("downloadContent" + id).getElementsByClassName("studentName").item(0).getAttribute("ng-reflect-nz-title"))
    const imgData = canvas.toDataURL("image/png");
    console.log("generate canvas")
    return {imgData: imgData, studentName: studentName};
  }

  imageToZip(imageArray: any[]) {
    const jszip = new JSZip();
    for (let i = 0; i < imageArray.length; i++) {
      var binary = atob(imageArray[i].imgData.split(',')[1]);
      var array = [];
      for (let j = 0; j < binary.length; j++) {
        array.push(binary.charCodeAt(j));
      }
      let image = new Blob([new Uint8Array(array)], {
        type: 'image/png'
      });
      jszip.file(`${imageArray[i].studentName}-${Math.floor(Math.random() * 999999)}.png`, image)
      if (i === (imageArray.length - 1)) {
        jszip.generateAsync({type: 'blob'}).then(function (content) {
          saveAs(content, 'StudentMatrixCards.zip');
        });
      }
    }
    this.downloadIsLoading = false;
  }

}
