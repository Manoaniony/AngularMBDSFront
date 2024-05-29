export class Note {
  _id?: string;
  matricule!: string;
  nom!: string;
  rendu?: boolean;
  remarque?: string;
  dateDeRendu?: string | Date;
}
