import {BehaviourVoModel} from "../../behaviour/model/behaviour-vo-model";
import {StudentVoModel} from "../../student/model/student-vo.model";

export interface StudentBehaviourRecordVoModel {
  recordId: number;
  dateGiven: Date;
  behaviour: BehaviourVoModel;
  student: StudentVoModel;
  givenByTeacher: any;
}
