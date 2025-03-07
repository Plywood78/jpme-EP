import React from 'react';

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => (
  <header className="bg-[#1a1f2b] shadow-sm border-b border-gray-700">
    <div className="px-6 py-4">
      <h1 className="text-2xl font-bold text-white">{title}</h1>
    </div>
  </header>
);