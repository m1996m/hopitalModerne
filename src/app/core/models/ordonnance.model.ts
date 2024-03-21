export class OrdonnanceModel {
  constructor(
    public produit: string,
    public consultation_id: string,
    public quantite: string,
    public slug: string,
    public personnel_id: string,
    public patient_id: string,
    public motif: string,
    public description: string,
  ) {
  }
}
