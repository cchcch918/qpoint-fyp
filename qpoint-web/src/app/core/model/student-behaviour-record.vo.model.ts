import {BehaviourVoModel} from "../../behaviour/model/behaviour-vo-model";
import {StudentVoModel} from "../../student/model/student-vo.model";
import {StaffVoModel} from "../../staff/model/staff-vo.model";

export interface StudentBehaviourRecordVoModel {
  recordId: number;
  dateGiven: Date;
  behaviour: BehaviourVoModel;
  student: StudentVoModel;
  givenByTeacher: StaffVoModel;
}
