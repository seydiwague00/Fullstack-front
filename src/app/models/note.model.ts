export class Note {
  id?: number;
  matiere: string;
  valeur: number;

  constructor(matiere: string, valeur: number, id?: number) {
    this.matiere = matiere;
    this.valeur = valeur;
    if (id) {
      this.id = id;
    }
  }
}
