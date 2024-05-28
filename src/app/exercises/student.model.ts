export class Student {
  _id?: string
  matricule!: string
  nom!: string
  rendu?: boolean
  note?: number
  remarque?: string
  dateDeRendu?: string | Date
}
