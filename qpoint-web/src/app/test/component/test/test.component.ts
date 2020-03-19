import {Component, OnInit} from '@angular/core';
import {TestService} from "../../service/test.service";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  apiText: any;

  constructor(public testService: TestService) {
  }

  ngOnInit() {
    this.testService.testApi().subscribe(res => {
      if (res) {
        this.apiText = res.text;
      }
    })
  }

}
