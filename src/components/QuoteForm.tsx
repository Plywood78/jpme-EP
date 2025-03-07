import React, { useState } from 'react';
import { MeterSection } from './quote/MeterSection';
import { CompanySection } from './quote/CompanySection';
import { ContactSection } from './quote/ContactSection';
import { useCompanySearch } from '../hooks/useCompanySearch';
import { Company } from '../types/company';

interface MeterEntry {
  number: string;
  date: string;
}

interface FormData {
  // Meter Info
  meters: MeterEntry[];
  globalStartDate: string;
  authorized: boolean;
  
  // Company Info
  siren: string;
  companyName: string;
  codeNaf: string;
  libelleCodeNaf: string;
  address: string;
  
  // Contact Info
  civility: 'M.' | 'Mme' | '';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  attachment: File | null;
}

interface QuoteFormProps {
  onSubmit: (data: FormData) => void;
}

export const QuoteForm = ({ onSubmit }: QuoteFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    meters: [{ number: '', date: '' }],
    globalStartDate: '',
    authorized: false,
    siren: '',
    companyName: '',
    codeNaf: '',
    libelleCodeNaf: '',
    address: '',
    civility: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    attachment: null,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { companies, isLoading, error } = useCompanySearch(searchTerm);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleMeterChange = (index: number, value: string) => {
    const newMeters = [...formData.meters];
    newMeters[index] = { ...newMeters[index], number: value.slice(0, 14) };
    setFormData({ ...formData, meters: newMeters });
  };

  const handleDateChange = (index: number, value: string) => {
    const newMeters = [...formData.meters];
    newMeters[index] = { ...newMeters[index], date: value };
    setFormData({ ...formData, meters: newMeters });
  };

  const handleGlobalDateChange = (value: string) => {
    const newMeters = formData.meters.map(meter => ({
      ...meter,
      date: value
    }));
    setFormData({
      ...formData,
      globalStartDate: value,
      meters: newMeters
    });
  };

  const handleMeterNumberPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const numbers = pastedData.split(/[\n,]/).map(n => n.trim()).filter(n => n);
    
    if (numbers.length > 0) {
      const newMeters = numbers.map(number => ({
        number: number.slice(0, 14),
        date: formData.globalStartDate
      }));
      setFormData({ ...formData, meters: newMeters });
    }
  };

  const handleCompanySelect = (company: Company) => {
    setFormData({
      ...formData,
      siren: company.siren,
      companyName: company.name,
      codeNaf: company.codeNaf || '',
      libelleCodeNaf: company.libelleCodeNaf || '',
      address: company.address,
    });
    setShowSuggestions(false);
    setSearchTerm(company.name);
  };

  const handleContactChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, attachment: e.target.files[0] });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Nouvelle demande de cotation</h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <MeterSection
            meters={formData.meters}
            globalStartDate={formData.globalStartDate}
            authorized={formData.authorized}
            onMeterChange={handleMeterChange}
            onDateChange={handleDateChange}
            onGlobalDateChange={handleGlobalDateChange}
            onAuthorizationChange={(value) => setFormData({ ...formData, authorized: value })}
            onMeterNumberPaste={handleMeterNumberPaste}
            onAddMeter={() => setFormData({
              ...formData,
              meters: [...formData.meters, { number: '', date: formData.globalStartDate }]
            })}
            onRemoveMeter={(index) => setFormData({
              ...formData,
              meters: formData.meters.filter((_, i) => i !== index)
            })}
          />

          <CompanySection
            searchTerm={searchTerm}
            companies={companies}
            isLoading={isLoading}
            error={error}
            showSuggestions={showSuggestions}
            formData={formData}
            onSearchChange={setSearchTerm}
            onShowSuggestions={setShowSuggestions}
            onCompanySelect={handleCompanySelect}
          />

          <ContactSection
            formData={formData}
            onFormDataChange={handleContactChange}
            onFileChange={handleFileChange}
          />

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-[#ffc72c] text-gray-900 px-8 py-3 rounded-lg text-lg font-medium hover:bg-[#ffd55f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffc72c] transition-colors"
            >
              Demander une cotation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};