import React, { useState } from 'react';
import { Zap, Calendar, CalendarClock, Plus, AlertCircle } from 'lucide-react';
import { AuthorizationToggle } from './AuthorizationToggle';

interface MeterEntry {
  number: string;
  date: string;
}

interface MeterSectionProps {
  meters: MeterEntry[];
  globalStartDate: string;
  authorized: boolean;
  onMeterChange: (index: number, value: string) => void;
  onDateChange: (index: number, value: string) => void;
  onGlobalDateChange: (value: string) => void;
  onAuthorizationChange: (value: boolean) => void;
  onMeterNumberPaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  onAddMeter: () => void;
  onRemoveMeter: (index: number) => void;
}

export const MeterSection = ({
  meters,
  globalStartDate,
  authorized,
  onMeterChange,
  onDateChange,
  onGlobalDateChange,
  onAuthorizationChange,
  onMeterNumberPaste,
  onAddMeter,
  onRemoveMeter
}: MeterSectionProps) => {
  const [touchedFields, setTouchedFields] = useState<{ [key: number]: boolean }>({});

  const handleMeterBlur = (index: number) => {
    setTouchedFields(prev => ({ ...prev, [index]: true }));
  };

  const validateMeterNumber = (number: string) => {
    if (!number) return false;
    return /^\d{14}$/.test(number);
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
        <Zap className="h-6 w-6 mr-2 text-[#ffc72c]" />
        Informations du compteur
      </h3>

      {/* Global Date Section - Only shown when there's more than one meter */}
      {meters.length > 1 && (
        <div className="mb-6 flex justify-end">
          <div className="bg-[#fff8e1] p-4 rounded-lg border border-[#ffc72c] max-w-md">
            <div className="flex items-center mb-2">
              <CalendarClock className="h-5 w-5 text-[#ffc72c] mr-2" />
              <label className="text-sm font-medium text-gray-900">Date de début globale</label>
            </div>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-[#ffc72c]" />
              </div>
              <input
                type="date"
                value={globalStartDate}
                onChange={(e) => onGlobalDateChange(e.target.value)}
                className="pl-10 block w-full h-12 rounded-lg border-[#ffc72c] focus:ring-[#ffc72c] focus:border-[#ffc72c]"
              />
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Cette date sera appliquée à tous les compteurs
            </p>
          </div>
        </div>
      )}

      {/* Meters Section */}
      <div className="space-y-4">
        {meters.map((meter, index) => (
          <div key={index} className="flex gap-4 items-start bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {meters.length > 1 ? `Numéro de compteur ${index + 1}` : 'Numéro de compteur'}
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Zap className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  required
                  pattern="\d{14}"
                  value={meter.number}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 14);
                    onMeterChange(index, value);
                  }}
                  onBlur={() => handleMeterBlur(index)}
                  onPaste={onMeterNumberPaste}
                  placeholder="14 chiffres requis"
                  className={`pl-10 block w-full h-12 rounded-lg ${
                    touchedFields[index] && !validateMeterNumber(meter.number)
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-[#ffc72c] focus:border-[#ffc72c]'
                  }`}
                />
                {touchedFields[index] && !validateMeterNumber(meter.number) && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                )}
              </div>
              {touchedFields[index] && meter.number && !validateMeterNumber(meter.number) && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  Le numéro de compteur doit contenir exactement 14 chiffres
                </p>
              )}
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date de début
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  required
                  value={meter.date}
                  onChange={(e) => onDateChange(index, e.target.value)}
                  className="pl-10 block w-full h-12 rounded-lg border-gray-300 focus:ring-[#ffc72c] focus:border-[#ffc72c]"
                />
              </div>
            </div>

            {meters.length > 1 && (
              <button
                type="button"
                onClick={() => onRemoveMeter(index)}
                className="mt-8 px-3 py-2 text-red-600 hover:text-red-800"
              >
                Supprimer
              </button>
            )}
          </div>
        ))}
        
        <button
          type="button"
          onClick={onAddMeter}
          className="mt-2 text-[#ffc72c] hover:text-[#ffd55f] font-medium flex items-center"
        >
          <Plus className="h-5 w-5 mr-1" />
          Ajouter un compteur
        </button>
      </div>

      <AuthorizationToggle
        authorized={authorized}
        onChange={onAuthorizationChange}
      />
    </div>
  );
};