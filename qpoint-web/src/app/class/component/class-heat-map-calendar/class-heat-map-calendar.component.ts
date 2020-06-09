import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {StudentBehaviourRecordVoModel} from "../../../core/model/student-behaviour-record.vo.model";

const weekdayName = new Intl.DateTimeFormat('en-us', {weekday: 'short'});
const monthName = new Intl.DateTimeFormat('en-us', {month: 'short'});

@Component({
  selector: 'app-class-heat-map-calendar',
  templateUrl: './class-heat-map-calendar.component.html',
  styleUrls: ['./class-heat-map-calendar.component.css']
})
export class ClassHeatMapCalendarComponent implements OnInit, OnChanges {
  //options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  legendTitle = 'Legend';
  showXAxisLabel = true;
  tooltipDisabled = false;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'GDP Per Capita';
  showGridLines = true;
  innerPadding = '10%';
  barPadding = 8;
  groupPadding = 16;
  roundDomains = false;
  maxRadius = 10;
  minRadius = 3;
  showSeriesOnHover = true;
  roundEdges: boolean = true;
  animations: boolean = true;
  xScaleMin: any;
  xScaleMax: any;
  yScaleMin: number;
  yScaleMax: number;
  showDataLabel = false;

  @Input() behaviourRecordsByClass: StudentBehaviourRecordVoModel[];
  colorScheme = {
    domain: ['#FA8072', '#87CEFA']
  };

  calendarData: any[]


  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.behaviourRecordsByClass) {
      if (this.behaviourRecordsByClass) {
        this.calendarData = this.getCalendarData(this.behaviourRecordsByClass);
      }
    }
  }


  calendarTooltipText(c): string {
    return `
      <span class="tooltip-label">${c.label} • ${c.cell.date.toLocaleDateString()}</span>
      <span class="tooltip-val">${c.data.toLocaleString()} points</span>
    `;
  }

  calendarAxisTickFormatting(mondayString: string) {
    const monday = new Date(mondayString);
    const month = monday.getMonth();
    const day = monday.getDate();
    const year = monday.getFullYear();
    const lastSunday = new Date(year, month, day - 1);
    const nextSunday = new Date(year, month, day + 6);
    return (lastSunday.getMonth() !== nextSunday.getMonth()) ? monthName.format(nextSunday) : '';
  }

  getCalendarData(behaviourRecordsByClass: StudentBehaviourRecordVoModel[]): any[] {
    // today
    const now = new Date();
    const todaysDay = now.getDate();
    const thisDay = new Date(now.getFullYear(), now.getMonth(), todaysDay);

    // Monday
    const thisMonday = new Date(thisDay.getFullYear(), thisDay.getMonth(), todaysDay - thisDay.getDay() + 1);
    const thisMondayDay = thisMonday.getDate();
    const thisMondayYear = thisMonday.getFullYear();
    const thisMondayMonth = thisMonday.getMonth();

    // 52 weeks before monday
    const calendarData = [];
    const getDate = d => new Date(thisMondayYear, thisMondayMonth, d);
    for (let week = -52; week <= 0; week++) {
      const mondayDay = thisMondayDay + (week * 7);
      const monday = getDate(mondayDay);

      // one week
      const series = [];
      for (let dayOfWeek = 7; dayOfWeek > 0; dayOfWeek--) {
        const date = getDate(mondayDay - 1 + dayOfWeek);

        // skip future dates
        if (date > now) {
          continue;
        }

        // value
        let value = 0;
        behaviourRecordsByClass.forEach(record => {
          if (new Date(record.dateGiven).getFullYear() === date.getFullYear() && new Date(record.dateGiven).getMonth() === date.getMonth() && new Date(record.dateGiven).getDate() === date.getDate()) {
            value += record.behaviour.behaviourPoint
          }
        })
        series.push({
          date,
          name: weekdayName.format(date),
          value
        });
      }

      calendarData.push({
        name: monday.toString(),
        series
      });
    }
    return calendarData;
  }

  onSelect(event: any) {
    console.log(event);
  }

}
