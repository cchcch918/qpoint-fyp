import {NotificationVoModel} from "../../notification/model/notification-vo-model";

export interface ParentVoModel {
  parentId: number;
  email: string;
  notifications: NotificationVoModel[];
  deviceId: string;
  devicePlatform: string;
}
