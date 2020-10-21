import {GroupVoModel} from "../../group/model/GroupVoModel";
import {ClassVoModel} from "../../class/model/class-vo.model";

export interface StudentVoModel {
  staffId: number;
  dateCreated: Date;
  username: string;
  email: string
  groups: GroupVoModel[];
  classes: ClassVoModel[];
  isAdmin: string;

}
