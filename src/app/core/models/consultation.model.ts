export class ConsultationModel {
  constructor(
  public rdv_id: string,
  public patient_id : string,
  public personnel_id : string,
  public plainte : string,
  public allergie : string,
  public precedent : string,
  public autre : string,
  public resultat : string,
  public examens : string,
  public slug: string,
  public fumeur : string,
  public buveur : string,
  public situation : string,
  public cout : string,
  public date_visite : string,
  public taille : string,
  public poids : string,
  ) {
  }
}
