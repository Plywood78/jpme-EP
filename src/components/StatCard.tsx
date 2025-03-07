import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    up: boolean;
  };
  color: string;
}

export const StatCard = ({ title, value, icon: Icon, trend, color }: StatCardProps) => (
  <div className="bg-[#242937] p-6 rounded-lg">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
        {trend && (
          <p className={`flex items-center text-sm mt-2 ${trend.up ? 'text-green-500' : 'text-red-500'}`}>
            {trend.up ? (
              <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            ) : (
              <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 7L17 17M17 17H7M17 17V7" />
              </svg>
            )}
            {trend.value}
          </p>
        )}
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="h-6 w-6 text-[#1a1f2b]" />
      </div>
    </div>
  </div>
);