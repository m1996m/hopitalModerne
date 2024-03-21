import {ExamenEntity} from "./examen.entity";
import {OrdonnanceEntity} from "./ordonnance.entity";

export interface ConsultationEntity{

  rdv_id: string,
  patient_id : string,
  personnel_id : string,
  plainte : string,
  allergie : string,
  precedent : string,
  autre : string,
  resultat : string,
  examens : string,
  slug: string,
  fumeur : 'Non' | 'Oui',
  buveur : 'Non' | 'Oui',
  situation : string,
  cout : number,
  date_visite : Date,
  taille : number,
  poids : number,
  examen: ExamenEntity[];
  ordonnance: OrdonnanceEntity[];
}
