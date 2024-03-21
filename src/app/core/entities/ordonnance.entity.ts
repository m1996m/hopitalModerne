
export interface OrdonnanceEntity{
  id: number;
  consultation_id: string;
  slug: string;
  personnel_id: string;
  patient_id: string;
  motif: string;
  description: string;
  produit: ProduitEntity[];
}

export interface ProduitEntity {
  id: number,
  designation: string,
  ordonnance_id: string,
  motif: string,
  type: string,
  quantite: number,
  createdAt: Date,
}
