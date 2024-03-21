import {ConsultationEntity} from "./consultation.entity";
import {RdvEntity} from "./rdv.entity";
import {ExamenEntity} from "./examen.entity";
import {OrdonnanceEntity} from "./ordonnance.entity";
import {TraitementEntity} from "./traitement.entity";

export interface PersonnelEntity{

  id: number;
  poste: string;
  tel: string;
  nom: string;
  prenom: string;
  adresse: string;
  profile: string;
  user_id: string;
  service: string;
  hopital: string;
  slug: string;
  date_naissance: Date;
  nationnalite: string;
  email: string;
  description: string;
  genre: 'Homme' | 'Femme';
  consultation: ConsultationEntity[];
  rdv: RdvEntity[];
  patient_personnel: PatientPersonnelEntity[];
  rdv_patient: RendezVousPatientEntity[];
  examen: ExamenEntity[];
  ordonnance: OrdonnanceEntity[];
  traitement: TraitementEntity[];
}

export interface PatientPersonnelEntity {
  id: number;
  patient_id: string;
  personnel_id: string;
}

export interface RendezVousPatientEntity {
  id: number;
  rdv_id: string;
  patient_id: string;
  personnel_id: string;
  statut: string;
}
