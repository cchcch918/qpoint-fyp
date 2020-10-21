import {GroupVoModel} from "../../group/model/GroupVoModel";
import {ClassVoModel} from "../../class/model/class-vo.model";
import {ParentVoModel} from "./parent-vo.model";

export interface StudentVoModel {
  studentId: number;
  dateCreated: Date;
  fullName: string;
  groups: GroupVoModel[];
  class: ClassVoModel;
  parent: ParentVoModel;
  profileImagePath: string;
  totalBehaviourPoint?: number;
}
