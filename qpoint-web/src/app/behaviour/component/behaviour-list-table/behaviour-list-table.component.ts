import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ClassVoModel} from "../../../class/model/class-vo.model";
import {StudentVoModel} from "../../../student/model/student-vo.model";
import {NzMessageService, NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder} from "ng-zorro-antd";
import {BehaviourService} from "../../service/behaviour.service";
import {BehaviourVoModel} from "../../model/behaviour-vo-model";

interface ColumnItem {
  name: string;
  sortOrder?: NzTableSortOrder;
  sortFn?: NzTableSortFn;
  listOfFilter?: NzTableFilterList;
  filterFn?: NzTableFilterFn;
  filterMultiple?: boolean;
  sortDirections?: NzTableSortOrder[];
  width?: string;
}

@Component({
  selector: 'app-behaviour-list-table',
  templateUrl: './behaviour-list-table.component.html',
  styleUrls: ['./behaviour-list-table.component.css']
})


export class BehaviourListTableComponent implements OnInit, OnChanges {
  listOfColumns: ColumnItem[] = [
    {
      name: 'Behaviour Id',
      sortOrder: 'descend',
      sortFn: (a: BehaviourVoModel, b: BehaviourVoModel) => a.behaviourId - b.behaviourId,
      width: "10vh",
    },
    {
      name: 'Behaviour Name',
      sortOrder: null,
      sortFn: (a: BehaviourVoModel, b: BehaviourVoModel) => a.behaviourName.localeCompare(b.behaviourName),
      filterMultiple: true,
      filterFn: (list: string[], item: StudentVoModel) => list.some(name => item.fullName.indexOf(name) !== -1),
      width: "20vh",

    },
    {
      name: 'Date Created',
      sortOrder: null,
      sortFn: (a: ClassVoModel, b: ClassVoModel) => {
        return (new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime());
      },
      width: "15vh",
    },
    {
      name: 'Created By',
    },
    {
      name: 'Points',
    },
    {
      name: 'Action',
      width: "8vh",
    },
  ];

  @Input() update: boolean;

  tableLoading: boolean;
  allBehaviours: BehaviourVoModel[];
  editingBehaviour: BehaviourVoModel;

  constructor(private behaviourService: BehaviourService, private msg: NzMessageService,) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.update) {
      this.updateBehaviourData();
    }
  }

  updateBehaviourData() {
    this.tableLoading = true
    this.behaviourService.showAllBehaviours().subscribe(res => {
      console.table(res);
      this.allBehaviours = res;
      this.tableLoading = false;
    })
  }

  deleteBehaviour({behaviourName, behaviourId}) {
    this.behaviourService.deleteBehaviour({behaviourId: behaviourId}).subscribe(res => {
        if (res) {
          this.msg.success(`Behaviour ${behaviourName} deleted`);
          this.updateBehaviourData();
        }
      },
      error => {
        this.msg.error('Please try again later' + error?.errorMessage);
      }
    )
  }

  editBehaviour() {
    let payload = {
      behaviourId: this.editingBehaviour.behaviourId,
      behaviourName: this.editingBehaviour.behaviourName,
      behaviourPoint: +this.editingBehaviour.behaviourPoint
    }
    console.log("payload", payload)
    this.behaviourService.updateBehaviour(payload).subscribe(res => {
        if (res) {
          this.msg.success(`Behaviour ${this.editingBehaviour.behaviourId} updated`);
          this.updateBehaviourData();
        }
        this.editingBehaviour = null;

      }, error => {
        this.msg.error('Please try again later. Error: ' + error.error.errorMessage);
        this.editingBehaviour = null;
      }
    )
  }

  cancelEditAction() {
    this.editingBehaviour = null;
  }

  startEdit(behaviour: BehaviourVoModel) {
    this.editingBehaviour = Object.create(behaviour);
  }
}
