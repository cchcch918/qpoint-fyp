import {StaffEntity} from "../../../../../qpoint-api/src/staff/staff.entity";

export interface BehaviourVoModel {
  behaviourId: number;
  behaviourName: string;
  dateCreated: Date;
  behaviourPoint: number;
  createdByAdmin: StaffEntity;
}
