export class ExamenModel {
  constructor(
    public resultat: string,
    public image: string,
    public consultation_id: string,
    public autre: string,
    public slug: string,
    public designation: string,
    public cout: string,
    public patient_id: string,
    public personnel_id: string,
    public type: string,
    public date_jour: any
  ) {
  }
}
