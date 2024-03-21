import {ConsultationEntity} from "./consultation.entity";
import {RendezVousPatientEntity} from "./personnel.entity";

export interface RdvEntity{
  id: number;
  personnel_id: string;
  date_jour: Date;
  plage: string;
  slug: string;
  type: 'Consultation' | 'Ordonnance' | 'Examen';
  consultation: ConsultationEntity[];
  rdv_patient: RendezVousPatientEntity[];
}
