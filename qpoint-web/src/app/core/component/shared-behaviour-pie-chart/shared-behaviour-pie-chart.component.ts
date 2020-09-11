import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {StudentBehaviourRecordVoModel} from "../../model/student-behaviour-record.vo.model";

@Component({
  selector: 'app-shared-behaviour-pie-chart',
  templateUrl: './shared-behaviour-pie-chart.component.html',
  styleUrls: ['./shared-behaviour-pie-chart.component.css']
})
export class SharedBehaviourPieChartComponent implements OnInit, OnChanges {

  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Behaviour';
  showYAxisLabel = true;
  yAxisLabel = 'Number of Behavioral Points';
  timeline = true;

  colorScheme = {
    domain: ['#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB', '#9370DB']
  };

  @Input() behaviourRecords: StudentBehaviourRecordVoModel[];
  positiveBehavioralPoints: number = 0;
  negativeBehavioralPoints: number = 0;
  result: any[];

  constructor() {
  }

  ngOnInit(): void {
  }


  onSelect(event: any) {
    console.log(event);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.behaviourRecords) {
      this.positiveBehavioralPoints = 0;
      this.negativeBehavioralPoints = 0;

      if (this.behaviourRecords) {
        this.behaviourRecords.forEach(record => {
          record.behaviour.behaviourPoint > 0 ? this.positiveBehavioralPoints += record.behaviour.behaviourPoint : this.negativeBehavioralPoints += record.behaviour.behaviourPoint
        })
        this.result = [
          {
            "name": "Total Positive Behaviour Points",
            "value": this.positiveBehavioralPoints
          },
          {
            "name": "Total Negative Behaviour Points",
            "value": Math.abs(this.negativeBehavioralPoints)
          },
        ];
      }
    }
  }

}
