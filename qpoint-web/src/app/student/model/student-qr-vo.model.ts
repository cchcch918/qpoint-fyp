import {StudentVoModel} from "./student-vo.model";

export interface StudentQrVoModel {
  student: StudentVoModel;
  qrCode: string;
}
