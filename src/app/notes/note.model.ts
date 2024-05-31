export class Note {
  _id?: string;
  matricule!: string;
  nom!: string;
  note!: number;
  rendu?: boolean;
  remarque?: string;
  dateDeRendu?: string | Date;
}
