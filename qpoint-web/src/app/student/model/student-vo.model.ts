export interface StudentVoModel {
  studentId: number;
  dateCreated: Date;
  fullName: string;
  groups: any[];
  class: any;
  parent: any;
  profileImagePath: string;
  totalBehaviourPoint?: number;
}
