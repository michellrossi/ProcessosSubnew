import { Processo } from '../types';
import { FileText, ClipboardCheck, AlertCircle, TrendingUp } from 'lucide-react';

interface DashboardProps {
  processos: Processo[];
}

export const Dashboard = ({ processos }: DashboardProps) => {
  const total = processos.length;

  const concluidos = processos.filter((p) => p.status === 'Demanda Concluída').length;
  const pendentes = processos.filter((p) => p.status === 'Ação Necessaria').length;
  const autosEmitidos = processos.filter((p) => p.status === 'Auto Emitido').length;

  const cards = [
    {
      title: 'Total de Processos',
      value: total,
      icon: FileText,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgLight: 'bg-blue-50',
    },
    {
      title: 'Demandas Concluídas',
      value: concluidos,
      icon: ClipboardCheck,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgLight: 'bg-green-50',
    },
    {
      title: 'Ações Necessárias',
      value: pendentes,
      icon: AlertCircle,
      color: 'bg-amber-500',
      textColor: 'text-amber-600',
      bgLight: 'bg-amber-50',
    },
    {
      title: 'Autos Emitidos',
      value: autosEmitidos,
      icon: TrendingUp,
      color: 'bg-indigo-500',
      textColor: 'text-indigo-600',
      bgLight: 'bg-indigo-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                <p className={`text-3xl font-bold ${card.textColor}`}>{card.value}</p>
              </div>
              <div className={`${card.bgLight} p-3 rounded-lg`}>
                <Icon className={`w-8 h-8 ${card.textColor}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
