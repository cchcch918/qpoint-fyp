import {StaffEntity} from "../../../../../qpoint-api/src/staff/staff.entity";

export interface NotificationVoModel {
  notificationId: number;
  notificationTitle: string;
  notificationMessage: string;
  createdByAdmin: StaffEntity;
  dateCreated: Date;


}
