import { Postura, Status } from '../types';
import { Search, Filter } from 'lucide-react';

interface FiltersProps {
  busca: string;
  statusFiltro: Status | 'TODOS';
  posturaFiltro: Postura | 'TODAS';
  onBuscaChange: (busca: string) => void;
  onStatusChange: (status: Status | 'TODOS') => void;
  onPosturaChange: (postura: Postura | 'TODAS') => void;
}

const posturas: Postura[] = [
  'ATIVIDADE',
  'OBRAS',
  'MPL',
  'POP',
  'Falta de AFLR',
  'Acessibilidade',
  'Limpeza',
  'SABESP',
  'Área Pública',
  'Invasão',
  'Ambulante',
  'Equipamento',
  'Recurso Multa',
  'COMGÁS',
  'Publicidade',
  'Comando Noturno',
  'Manejo Arbóreo',
];

const statusOptions: Status[] = [
  'Ação Necessaria',
  'Demanda Concluída',
  'Auto Emitido',
  'A.R. entregue',
  'A.R. devolvido',
  'Demanda Agrupada',
];

export const Filters = ({
  busca,
  statusFiltro,
  posturaFiltro,
  onBuscaChange,
  onStatusChange,
  onPosturaChange,
}: FiltersProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-800">Filtros e Busca</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Busca Global
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={busca}
              onChange={(e) => onBuscaChange(e.target.value)}
              placeholder="Buscar em todos os campos..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filtrar por Status
          </label>
          <select
            value={statusFiltro}
            onChange={(e) => onStatusChange(e.target.value as Status | 'TODOS')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="TODOS">Todos os Status</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filtrar por Postura
          </label>
          <select
            value={posturaFiltro}
            onChange={(e) => onPosturaChange(e.target.value as Postura | 'TODAS')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="TODAS">Todas as Posturas</option>
            {posturas.map((postura) => (
              <option key={postura} value={postura}>
                {postura}
              </option>
            ))}
          </select>
        </div>
      </div>

      {(busca || statusFiltro !== 'TODOS' || posturaFiltro !== 'TODAS') && (
        <div className="mt-4 flex items-center gap-2">
          <span className="text-sm text-gray-600">Filtros ativos:</span>
          {busca && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Busca: {busca}
            </span>
          )}
          {statusFiltro !== 'TODOS' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Status: {statusFiltro}
            </span>
          )}
          {posturaFiltro !== 'TODAS' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
              Postura: {posturaFiltro}
            </span>
          )}
          <button
            onClick={() => {
              onBuscaChange('');
              onStatusChange('TODOS');
              onPosturaChange('TODAS');
            }}
            className="ml-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Limpar filtros
          </button>
        </div>
      )}
    </div>
  );
};
