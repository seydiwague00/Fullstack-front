import { Note } from './note.model';  // Assure-toi que le chemin d'importation est correct

export class Etudiant {
  nom: string;               // Nom de l'étudiant
  prenom: string;            // Prénom de l'étudiant
  email: string;             // Email de l'étudiant
  codeEtudiant: string;      // Code étudiant, clé unique
  niveauEtude: string;       // Niveau d'étude (par exemple, 'LICENCE_1', 'MASTER_1', etc.)
  notes: Note[];             // Tableau de notes (Relation avec les notes de l'étudiant)

  // Constructeur pour initialiser l'objet avec des valeurs par défaut
  constructor(
    nom: string,
    prenom: string,
    email: string,
    codeEtudiant: string,
    niveauEtude: string,
    notes: Note[] = []  // Valeur par défaut, tableau vide si aucune note n'est fournie
  ) {
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
    this.codeEtudiant = codeEtudiant;
    this.niveauEtude = niveauEtude;
    this.notes = notes;
  }
}
