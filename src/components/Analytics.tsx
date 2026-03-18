import { Processo, Postura, Status } from '../types';
import { BarChart3, PieChart } from 'lucide-react';

interface AnalyticsProps {
  processos: Processo[];
}

export const Analytics = ({ processos }: AnalyticsProps) => {
  const posturaCount: Record<string, number> = {};
  const statusCount: Record<string, number> = {};

  processos.forEach((processo) => {
    posturaCount[processo.postura] = (posturaCount[processo.postura] || 0) + 1;
    statusCount[processo.status] = (statusCount[processo.status] || 0) + 1;
  });

  const posturaData = Object.entries(posturaCount).sort(([, a], [, b]) => b - a);
  const statusData = Object.entries(statusCount).sort(([, a], [, b]) => b - a);

  const maxPosturaValue = Math.max(...posturaData.map(([, value]) => value), 1);
  const maxStatusValue = Math.max(...statusData.map(([, value]) => value), 1);

  const statusColors: Record<Status, string> = {
    'Ação Necessaria': 'bg-amber-500',
    'Demanda Concluída': 'bg-green-500',
    'Auto Emitido': 'bg-blue-500',
    'A.R. entregue': 'bg-cyan-500',
    'A.R. devolvido': 'bg-orange-500',
    'Demanda Agrupada': 'bg-gray-500',
  };

  const posturaColors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-amber-500',
    'bg-red-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
    'bg-orange-500',
    'bg-cyan-500',
    'bg-rose-500',
    'bg-fuchsia-500',
    'bg-lime-500',
    'bg-emerald-500',
    'bg-sky-500',
    'bg-violet-500',
    'bg-slate-500',
  ];

  if (processos.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <p className="text-gray-500 text-lg">Adicione processos para visualizar análises</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-800">Processos por Postura</h3>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {posturaData.map(([postura, count], index) => {
            const percentage = (count / maxPosturaValue) * 100;
            const percentageTotal = ((count / processos.length) * 100).toFixed(1);
            return (
              <div key={postura} className="flex items-center gap-3">
                <div className="w-40 flex-shrink-0">
                  <div className="flex items-end justify-end gap-2">
                    <span className="text-xs font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded">
                      {count}
                    </span>
                  </div>
                </div>

                <div
                  className={`h-8 rounded flex items-center justify-center text-xs font-bold text-white transition-all duration-300 min-w-fit`}
                  style={{
                    width: `${Math.max(percentage, 5)}%`,
                    backgroundColor: posturaColors[index % posturaColors.length].replace(
                      'bg-',
                      ''
                    ) as any,
                  }}
                  title={`${count} processo(s) - ${percentageTotal}%`}
                >
                  {percentage > 15 && <span>{percentageTotal}%</span>}
                </div>

                <div className="w-40 flex-shrink-0">
                  <span className="text-sm font-medium text-gray-700 truncate">{postura}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Total por Postura</span>
            <span className="text-xl font-bold text-gray-900">{Object.values(posturaCount).reduce((a, b) => a + b, 0)}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <PieChart className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-800">Processos por Status</h3>
        </div>

        <div className="space-y-4">
          {statusData.map(([status, count]) => {
            const percentage = (count / maxStatusValue) * 100;
            const percentageTotal = ((count / processos.length) * 100).toFixed(1);
            return (
              <div key={status}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{status}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{percentageTotal}%</span>
                    <span className="text-sm font-bold text-gray-900">{count}</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full ${
                      statusColors[status as Status] || 'bg-gray-500'
                    } transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Total de Processos</span>
            <span className="text-xl font-bold text-gray-900">{processos.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
