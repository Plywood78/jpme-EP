import { Company } from '../types/company';

interface PappersResponse {
  resultats_nom_entreprise?: Array<{
    nom_entreprise: string;
    siren: string;
    siren_formate: string;
    code_naf: string;
    libelle_code_naf: string;
    siege: {
      siret: string;
      siret_formate: string;
      numero_voie?: string;
      type_voie?: string;
      libelle_voie?: string;
      adresse_ligne_1?: string;
      adresse_ligne_2?: string;
      code_postal: string;
      ville: string;
    };
  }>;
}

const formatAddress = (siege: any): string => {
  const parts = [];
  if (siege.adresse_ligne_1) parts.push(siege.adresse_ligne_1);
  if (siege.adresse_ligne_2) parts.push(siege.adresse_ligne_2);
  if (siege.code_postal) parts.push(siege.code_postal);
  if (siege.ville) parts.push(siege.ville);
  return parts.filter(Boolean).join(' ');
};

export const searchCompanies = async (query: string): Promise<Company[]> => {
  if (!query.trim()) {
    return [];
  }

  try {
    const response = await fetch(
      `https://suggestions.pappers.fr/v2?q=${encodeURIComponent(query)}&cibles=nom_entreprise,siret`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: PappersResponse = await response.json();

    if (!data.resultats_nom_entreprise) {
      return [];
    }

    return data.resultats_nom_entreprise.map(company => ({
      siren: company.siren,
      formattedSiren: company.siren_formate,
      name: company.nom_entreprise,
      siret: company.siege.siret,
      codeNaf: company.code_naf,
      libelleCodeNaf: company.libelle_code_naf,
      address: formatAddress(company.siege),
      activity: company.libelle_code_naf,
      siege: company.siege
    }));

  } catch (error) {
    console.error('Error fetching companies:', error);
    throw error;
  }
};

export const getCompanyBySiren = async (siren: string): Promise<Company | null> => {
  try {
    const response = await fetch(
      `https://suggestions.pappers.fr/v2?q=${encodeURIComponent(siren)}&cibles=siren`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: PappersResponse = await response.json();
    const company = data.resultats_nom_entreprise?.[0];

    if (!company) {
      return null;
    }

    return {
      siren: company.siren,
      formattedSiren: company.siren_formate,
      name: company.nom_entreprise,
      siret: company.siege.siret,
      codeNaf: company.code_naf,
      libelleCodeNaf: company.libelle_code_naf,
      address: formatAddress(company.siege),
      activity: company.libelle_code_naf,
      siege: company.siege
    };

  } catch (error) {
    console.error('Error fetching company:', error);
    throw error;
  }
};