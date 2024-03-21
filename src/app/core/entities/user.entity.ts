import {HopitalEntity} from "./hopital.entity";
import {PersonnelEntity} from "./personnel.entity";
import {PatientEntity} from "./patient.entity";

export interface UserEntity{
   id: number;
   username: string;
   password: string;
   type_user: 'Hopital' | 'Patient' | 'Personnel' | 'Admin';
   slug: string;
   pays: string;
   statut: 'Actif' | 'Suspendu' | 'Supprimé';
   image: string;
   role: 'USER_HOPITAL' | 'USER_PATIENT' | 'USER_PERSONNEL' | 'USER_ADMIN'
   hopital: HopitalEntity[];
   personnel: PersonnelEntity[];
   patient: PatientEntity[];
}
