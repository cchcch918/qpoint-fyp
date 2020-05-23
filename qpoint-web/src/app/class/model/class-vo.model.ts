import {StudentVoModel} from "../../student/model/student-vo.model";

export interface ClassVoModel {
  classId: number;
  className: string;
  dateCreated: Date;
  students: StudentVoModel[];
  teachers: any[];
}
