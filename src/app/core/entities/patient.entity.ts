import {ConsultationEntity} from "./consultation.entity";
import {PatientPersonnelEntity, RendezVousPatientEntity} from "./personnel.entity";
import {TraitementEntity} from "./traitement.entity";

export interface PatientEntity{
  id: number;
  nom: string;
  prenom: string;
  tel: string;
  adresse: string;
  profession: string;
  user_id: string;
  hopital: string;
  slug: string;
  personnel: string;
  date_naissance: Date;
  nationnalite: string;
  email: string;
  description: string;
  genre: string;
  consultation: ConsultationEntity[];
  patient_personnel: PatientPersonnelEntity[];
  rdv_patient: RendezVousPatientEntity[];
  traitement: TraitementEntity[];
}
