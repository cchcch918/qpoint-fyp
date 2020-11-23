import {GroupVoModel} from "../../group/model/GroupVoModel";
import {ClassVoModel} from "../../class/model/class-vo.model";

export interface StaffVoModel {
  staffId: number;
  dateCreated: Date;
  username: string;
  email: string
  groups: GroupVoModel[];
  classes: ClassVoModel[];
  isAdmin: string;
  token: string;

}
