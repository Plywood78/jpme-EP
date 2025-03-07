import React from 'react';
import { QuoteData } from '../types/quote';

interface QuoteDetailsProps {
  data: QuoteData;
}

export const QuoteDetails = ({ data }: QuoteDetailsProps) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-700">
      <thead>
        <tr className="text-xs font-medium text-gray-400 uppercase">
          <th className="px-4 py-2">Durée</th>
          <th className="px-4 py-2">BASE</th>
          <th className="px-4 py-2">HPH</th>
          <th className="px-4 py-2">HCH</th>
          <th className="px-4 py-2">HPE</th>
          <th className="px-4 py-2">HCE</th>
          <th className="px-4 py-2">C25</th>
          <th className="px-4 py-2">C26</th>
          <th className="px-4 py-2">C27</th>
          <th className="px-4 py-2">C28</th>
          <th className="px-4 py-2">C29</th>
          <th className="px-4 py-2">Abonnement (€/an)</th>
          <th className="px-4 py-2">Date début</th>
          <th className="px-4 py-2">Date limite</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-700">
        <tr className="text-sm text-gray-300">
          <td className="px-4 py-2">{data.duration}</td>
          <td className="px-4 py-2">{data.base.toFixed(2)}</td>
          <td className="px-4 py-2">{data.hph.toFixed(2)}</td>
          <td className="px-4 py-2">{data.hch.toFixed(2)}</td>
          <td className="px-4 py-2">{data.hpe.toFixed(2)}</td>
          <td className="px-4 py-2">{data.hce.toFixed(2)}</td>
          <td className="px-4 py-2">{data.c25.toFixed(2)}</td>
          <td className="px-4 py-2">{data.c26.toFixed(2)}</td>
          <td className="px-4 py-2">{data.c27.toFixed(2)}</td>
          <td className="px-4 py-2">{data.c28.toFixed(2)}</td>
          <td className="px-4 py-2">{data.c29.toFixed(2)}</td>
          <td className="px-4 py-2">{data.subscription}</td>
          <td className="px-4 py-2">{new Date(data.startDate).toLocaleDateString()}</td>
          <td className="px-4 py-2">{new Date(data.contractDeadline).toLocaleDateString()}</td>
        </tr>
      </tbody>
    </table>
  </div>
);