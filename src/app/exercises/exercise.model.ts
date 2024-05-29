import { Subject } from "../subjects/subject.model";
import { Student } from "./student.model"

export class Exercise {
  _id?: string;
  eleves?: Student[];
  label!: string;
  matiere!: Subject
}
