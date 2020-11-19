import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-shared-small-card',
  templateUrl: './shared-small-card.component.html',
  styleUrls: ['./shared-small-card.component.css']
})
export class SharedSmallCardComponent implements OnInit {
  @Input() iconName: string;
  @Input() colorCode: string;
  @Input() title: string;
  @Input() stats: number;

  constructor() {
  }

  ngOnInit(): void {
  }

}
