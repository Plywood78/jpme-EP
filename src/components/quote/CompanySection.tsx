import React, { useRef } from 'react';
import { Building2, Search, MapPin } from 'lucide-react';
import { Company } from '../../types/company';

interface CompanySectionProps {
  searchTerm: string;
  companies: Company[];
  isLoading: boolean;
  error: string | null;
  showSuggestions: boolean;
  formData: {
    companyName: string;
    siren: string;
    codeNaf: string;
    libelleCodeNaf: string;
    address: string;
  };
  onSearchChange: (value: string) => void;
  onShowSuggestions: (show: boolean) => void;
  onCompanySelect: (company: Company) => void;
}

export const CompanySection = ({
  searchTerm,
  companies,
  isLoading,
  error,
  showSuggestions,
  formData,
  onSearchChange,
  onShowSuggestions,
  onCompanySelect,
}: CompanySectionProps) => {
  const suggestionsRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
        <Building2 className="h-6 w-6 mr-2 text-[#ffc72c]" />
        Informations de l'entreprise
      </h3>
      <div className="space-y-6">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Rechercher une entreprise</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-[#ffc72c]" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => onShowSuggestions(true)}
              className="pl-10 block w-full h-12 rounded-lg border-gray-300 focus:ring-[#ffc72c] focus:border-[#ffc72c]"
              placeholder="Commencez à taper le nom ou SIREN de l'entreprise..."
            />
          </div>
          {isLoading && (
            <div className="absolute z-10 w-full mt-1 p-4 bg-white border border-gray-200 rounded-lg text-gray-600">
              Recherche en cours...
            </div>
          )}
          {error && (
            <div className="absolute z-10 w-full mt-1 p-4 bg-white border border-red-200 rounded-lg text-red-600">
              {error}
            </div>
          )}
          {showSuggestions && companies.length > 0 && (
            <div 
              ref={suggestionsRef}
              className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-auto"
            >
              {companies.map((company, index) => (
                <button
                  key={index}
                  type="button"
                  className="w-full text-left px-6 py-4 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg border-b border-gray-200 last:border-0"
                  onClick={() => onCompanySelect(company)}
                >
                  <div className="font-medium text-base text-gray-900">{company.name}</div>
                  <div className="text-sm text-[#ffc72c] mt-1">
                    SIREN: {company.formattedSiren}
                  </div>
                  <div className="text-sm text-gray-600">
                    {company.codeNaf} - {company.libelleCodeNaf}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {company.address}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 bg-white p-4 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Raison sociale</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building2 className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                required
                value={formData.companyName}
                className="pl-10 block w-full h-12 rounded-lg border-gray-300 bg-gray-50 cursor-not-allowed"
                readOnly
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SIREN</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building2 className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                required
                value={formData.siren}
                className="pl-10 block w-full h-12 rounded-lg border-gray-300 bg-gray-50 cursor-not-allowed"
                readOnly
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Code NAF</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="text"
                required
                value={formData.codeNaf}
                className="block w-full h-12 rounded-lg border-gray-300 bg-gray-50 cursor-not-allowed"
                readOnly
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Activité NAF</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="text"
                required
                value={formData.libelleCodeNaf}
                className="block w-full h-12 rounded-lg border-gray-300 bg-gray-50 cursor-not-allowed"
                readOnly
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                required
                value={formData.address}
                className="pl-10 block w-full h-12 rounded-lg border-gray-300 bg-gray-50 cursor-not-allowed"
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};