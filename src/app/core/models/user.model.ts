export class UserModel {
  constructor(
  public username: string,
  public password: string,
  public type_user: 'Hopital' | 'Patient' | 'Personnel' | 'Admin',
  public slug: string,
  public pays: string,
  public statut: 'Actif' | 'Suspendu' | 'Supprimé',
  public image: string,
  public role: 'USER_HOPITAL' | 'USER_PATIENT' | 'USER_PERSONNEL' | 'USER_ADMIN'
  ) {}
}
