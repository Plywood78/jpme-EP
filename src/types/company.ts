export interface Company {
  siren: string;
  name: string;
  siret: string;
  address: string;
  activity: string;
  codeNaf?: string;
  libelleCodeNaf?: string;
  formattedSiren?: string;
  siege?: {
    siret: string;
    code_postal: string;
    ville: string;
    numero_voie?: string;
    type_voie?: string;
    libelle_voie?: string;
    adresse_ligne_1?: string;
    adresse_ligne_2?: string;
  };
}