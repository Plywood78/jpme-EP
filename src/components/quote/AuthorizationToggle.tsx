import React from 'react';

interface AuthorizationToggleProps {
  authorized: boolean;
  onChange: (value: boolean) => void;
}

export const AuthorizationToggle = ({ authorized, onChange }: AuthorizationToggleProps) => {
  return (
    <div className="flex items-start space-x-3 mt-6 bg-gray-100 p-4 rounded-lg">
      <div 
        className="relative inline-block w-14 h-7 flex-shrink-0 cursor-pointer mt-0.5"
        onClick={() => onChange(!authorized)}
      >
        <input
          type="checkbox"
          className="sr-only"
          checked={authorized}
          onChange={(e) => onChange(e.target.checked)}
          id="authorization"
        />
        <div
          className={`absolute w-full h-full rounded-full transition-colors duration-200 ease-in-out ${
            authorized ? 'bg-[#ffc72c]' : 'bg-gray-200'
          }`}
        />
        <div
          className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform duration-200 ease-in-out transform ${
            authorized ? 'translate-x-7' : 'translate-x-0'
          } shadow-sm`}
        />
      </div>
      <label 
        htmlFor="authorization" 
        className="text-sm text-gray-600 cursor-pointer flex-1"
        onClick={() => onChange(!authorized)}
      >
        En cochant la présente case, j'atteste avoir été expressément autorisé par l'utilisateur du Point de Livraison à consulter l'ensemble des informations de consommation le concernant.
      </label>
    </div>
  );
};