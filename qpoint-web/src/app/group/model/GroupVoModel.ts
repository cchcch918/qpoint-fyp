import {StudentVoModel} from "../../student/model/student-vo.model";

export interface GroupVoModel {
  groupId: number;
  groupName: string;
  dateCreated: Date;
  students: StudentVoModel[];
  teacher: any;
  createdByAdmin: any;
}
