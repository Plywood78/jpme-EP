import React from 'react';
import { User, Mail, Phone, FileText } from 'lucide-react';

interface ContactSectionProps {
  formData: {
    civility: 'M.' | 'Mme' | '';
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  onFormDataChange: (field: string, value: string) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ContactSection = ({
  formData,
  onFormDataChange,
  onFileChange
}: ContactSectionProps) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
        <User className="h-6 w-6 mr-2 text-[#ffc72c]" />
        Informations du contact
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Civilité</label>
          <select
            value={formData.civility}
            onChange={(e) => onFormDataChange('civility', e.target.value)}
            className="mt-1 block w-full h-12 rounded-lg border-gray-300 focus:ring-[#ffc72c] focus:border-[#ffc72c]"
            required
          >
            <option value="">Sélectionner</option>
            <option value="M.">Monsieur</option>
            <option value="Mme">Madame</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              required
              value={formData.firstName}
              onChange={(e) => onFormDataChange('firstName', e.target.value)}
              className="pl-10 block w-full h-12 rounded-lg border-gray-300 focus:ring-[#ffc72c] focus:border-[#ffc72c]"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              required
              value={formData.lastName}
              onChange={(e) => onFormDataChange('lastName', e.target.value)}
              className="pl-10 block w-full h-12 rounded-lg border-gray-300 focus:ring-[#ffc72c] focus:border-[#ffc72c]"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => onFormDataChange('email', e.target.value)}
              className="pl-10 block w-full h-12 rounded-lg border-gray-300 focus:ring-[#ffc72c] focus:border-[#ffc72c]"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => onFormDataChange('phone', e.target.value)}
              className="pl-10 block w-full h-12 rounded-lg border-gray-300 focus:ring-[#ffc72c] focus:border-[#ffc72c]"
            />
          </div>
        </div>

        <div className="md:col-span-2 lg:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">Pièce jointe</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
            <div className="space-y-1 text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer rounded-md font-medium text-[#ffc72c] hover:text-[#ffd55f] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#ffc72c]">
                  <span>Télécharger un fichier</span>
                  <input
                    type="file"
                    className="sr-only"
                    onChange={onFileChange}
                  />
                </label>
                <p className="pl-1">ou glisser-déposer</p>
              </div>
              <p className="text-xs text-gray-500">PDF, PNG, JPG jusqu'à 10MB</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};