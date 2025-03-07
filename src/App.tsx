import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  Clock, 
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';

import { StatCard } from './components/StatCard';
import { DataTable } from './components/DataTable';
import { ChartCard } from './components/ChartCard';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { QuoteForm } from './components/QuoteForm';
import { QuoteDetails } from './components/QuoteDetails';
import { mockQuotes } from './data/mockQuotes';
import { Quote } from './types/quote';

// Données de démonstration pour les graphiques
const monthlyData = [
  { name: 'Jan', value: 45 },
  { name: 'Fév', value: 52 },
  { name: 'Mar', value: 48 },
  { name: 'Avr', value: 61 },
  { name: 'Mai', value: 55 },
  { name: 'Juin', value: 67 },
];

const statusData = [
  { name: 'En attente', value: 30 },
  { name: 'Prix reçu', value: 45 },
  { name: 'Contrat édité', value: 25 },
];

const COLORS = ['#ffc72c', '#60a5fa', '#34d399'];

type TabType = 'dashboard' | 'newQuote' | 'quoteTracking' | 'contractTracking' | 'renewal';

function App() {
  const [quotes, setQuotes] = useState<Quote[]>(mockQuotes);
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);

  const handleQuoteSubmit = (formData: any) => {
    const newQuote: Quote = {
      id: (quotes.length + 1).toString(),
      reference: `QT-2024-${(quotes.length + 1).toString().padStart(3, '0')}`,
      client: formData.name,
      requestDate: new Date().toISOString(),
      status: 'pending'
    };
    setQuotes([...quotes, newQuote]);
    setActiveTab('dashboard');
  };

  const getTabTitle = (tab: TabType) => {
    switch (tab) {
      case 'dashboard': return 'Tableau de bord';
      case 'newQuote': return 'Nouvelle cotation';
      case 'quoteTracking': return 'Suivi des cotations';
      case 'contractTracking': return 'Suivi des contrats';
      case 'renewal': return 'Renouvellements';
    }
  };

  const handleViewDetails = (quote: Quote) => {
    setSelectedQuote(quote);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                title="Cotations en cours" 
                value="67" 
                icon={TrendingUp}
                trend={{ value: "+12.5%", up: true }}
                color="bg-[#ffc72c]"
              />
              <StatCard 
                title="Clients actifs" 
                value="245" 
                icon={Users}
                trend={{ value: "+5.2%", up: true }}
                color="bg-blue-500"
              />
              <StatCard 
                title="Temps moyen de traitement" 
                value="2.4 jours" 
                icon={Clock}
                trend={{ value: "-8.1%", up: false }}
                color="bg-green-500"
              />
              <StatCard 
                title="Taux de conversion" 
                value="76%" 
                icon={CheckCircle2}
                trend={{ value: "+3.2%", up: true }}
                color="bg-purple-500"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard title="Évolution des cotations">
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937',
                      border: 'none',
                      borderRadius: '0.5rem',
                      color: '#fff'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#ffc72c" 
                    fill="#ffc72c" 
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ChartCard>

              <ChartCard title="Répartition par statut">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937',
                      border: 'none',
                      borderRadius: '0.5rem',
                      color: '#fff'
                    }}
                  />
                </PieChart>
              </ChartCard>
            </div>

            <DataTable
              title="Cotations récentes"
              columns={[
                { header: 'Référence', accessor: 'reference' },
                { header: 'Client', accessor: 'client' },
                { header: 'Date de demande', accessor: 'requestDate' },
                {
                  header: 'Statut',
                  accessor: 'status',
                  cell: (value) => (
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      value === 'pending'
                        ? 'bg-yellow-900 text-[#ffc72c]'
                        : value === 'quoted'
                        ? 'bg-blue-900 text-blue-200'
                        : 'bg-green-900 text-green-200'
                    }`}>
                      {value === 'pending' ? 'En attente' : 
                       value === 'quoted' ? 'Prix reçu' : 'Contrat édité'}
                    </span>
                  )
                },
                {
                  header: 'Actions',
                  accessor: 'id',
                  cell: (_, row) => (
                    <button
                      onClick={() => handleViewDetails(row)}
                      className="text-[#ffc72c] hover:text-[#ffd55f]"
                    >
                      Voir détails
                    </button>
                  )
                }
              ]}
              data={quotes}
            />

            {selectedQuote && selectedQuote.data && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-white mb-4">Détails de la cotation {selectedQuote.reference}</h3>
                <QuoteDetails data={selectedQuote.data} />
              </div>
            )}
          </div>
        );

      case 'newQuote':
        return <QuoteForm onSubmit={handleQuoteSubmit} />;

      case 'quoteTracking':
        return (
          <div className="space-y-6">
            <DataTable
              title="Suivi des cotations"
              columns={[
                { header: 'Référence', accessor: 'reference' },
                { header: 'Client', accessor: 'client' },
                { header: 'Date de demande', accessor: 'requestDate' },
                {
                  header: 'Statut',
                  accessor: 'status',
                  cell: (value) => (
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      value === 'pending'
                        ? 'bg-yellow-900 text-[#ffc72c]'
                        : value === 'quoted'
                        ? 'bg-blue-900 text-blue-200'
                        : 'bg-green-900 text-green-200'
                    }`}>
                      {value === 'pending' ? 'En attente' : 
                       value === 'quoted' ? 'Prix reçu' : 'Contrat édité'}
                    </span>
                  )
                },
                {
                  header: 'Actions',
                  accessor: 'id',
                  cell: (_, row) => (
                    <button
                      onClick={() => handleViewDetails(row)}
                      className="text-[#ffc72c] hover:text-[#ffd55f]"
                    >
                      Voir détails
                    </button>
                  )
                }
              ]}
              data={quotes}
              filters={
                <div className="flex justify-between items-center">
                  <div className="flex space-x-4">
                    <select className="bg-[#1a1f2b] border border-gray-700 rounded-lg text-white px-4 py-2">
                      <option value="all">Tous les statuts</option>
                      <option value="pending">En attente</option>
                      <option value="quoted">Prix reçu</option>
                      <option value="contracted">Contrat édité</option>
                    </select>
                    <select className="bg-[#1a1f2b] border border-gray-700 rounded-lg text-white px-4 py-2">
                      <option value="all">Toutes les périodes</option>
                      <option value="today">Aujourd'hui</option>
                      <option value="week">Cette semaine</option>
                      <option value="month">Ce mois</option>
                    </select>
                  </div>
                </div>
              }
            />

            {selectedQuote && selectedQuote.data && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-white mb-4">Détails de la cotation {selectedQuote.reference}</h3>
                <QuoteDetails data={selectedQuote.data} />
              </div>
            )}
          </div>
        );

      case 'contractTracking':
        return (
          <DataTable
            title="Suivi des contrats"
            columns={[
              { header: 'N° Contrat', accessor: 'contractNumber' },
              { header: 'Client', accessor: 'client' },
              { header: 'Date début', accessor: 'startDate' },
              { header: 'Date fin', accessor: 'endDate' },
              { header: 'Statut', accessor: 'status' },
              {
                header: 'Actions',
                accessor: 'id',
                cell: () => (
                  <>
                    <button className="text-[#ffc72c] hover:text-[#ffd55f] mr-4">
                      Voir contrat
                    </button>
                    <button className="text-[#ffc72c] hover:text-[#ffd55f]">
                      Télécharger
                    </button>
                  </>
                )
              }
            ]}
            data={[]}
            filters={
              <div className="flex space-x-4">
                <select className="bg-[#1a1f2b] border border-gray-700 rounded-lg text-white px-4 py-2">
                  <option value="all">Tous les statuts</option>
                  <option value="active">Actif</option>
                  <option value="pending">En attente de signature</option>
                  <option value="expired">Expiré</option>
                </select>
                <input
                  type="month"
                  className="bg-[#1a1f2b] border border-gray-700 rounded-lg text-white px-4 py-2"
                />
              </div>
            }
          />
        );

      case 'renewal':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard 
                title="À renouveler ce mois" 
                value="12" 
                icon={RefreshCw}
                color="bg-[#ffc72c]"
              />
              <StatCard 
                title="En cours de renouvellement" 
                value="5" 
                icon={Clock}
                color="bg-blue-500"
              />
              <StatCard 
                title="Renouvelés ce mois" 
                value="8" 
                icon={CheckCircle2}
                color="bg-green-500"
              />
            </div>

            <DataTable
              title="Renouvellements"
              columns={[
                { header: 'Client', accessor: 'client' },
                { header: 'N° Contrat', accessor: 'contractNumber' },
                { header: "Date d'échéance", accessor: 'expiryDate' },
                { header: 'Jours restants', accessor: 'daysRemaining' },
                { header: 'Statut', accessor: 'status' },
                {
                  header: 'Actions',
                  accessor: 'id',
                  cell: () => (
                    <button className="text-[#ffc72c] hover:text-[#ffd55f]">
                      Initier le renouvellement
                    </button>
                  )
                }
              ]}
              data={[]}
              filters={
                <div className="flex space-x-4">
                  <select className="bg-[#1a1f2b] border border-gray-700 rounded-lg text-white px-4 py-2">
                    <option value="all">Tous les statuts</option>
                    <option value="pending">À renouveler</option>
                    <option value="in_progress">En cours</option>
                    <option value="renewed">Renouvelé</option>
                  </select>
                  <select className="bg-[#1a1f2b] border border-gray-700 rounded-lg text-white px-4 py-2">
                    <option value="30">30 jours</option>
                    <option value="60">60 jours</option>
                    <option value="90">90 jours</option>
                  </select>
                </div>
              }
            />
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-[#1a1f2b]">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={getTabTitle(activeTab)} />
        <main className="flex-1 overflow-auto bg-[#1a1f2b] p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;