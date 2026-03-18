import { Processo, Status } from '../types';
import { Eye, CreditCard as Edit2, Trash2 } from 'lucide-react';

interface ProcessoTableProps {
  processos: Processo[];
  onView: (processo: Processo) => void;
  onEdit: (processo: Processo) => void;
  onDelete: (id: string) => void;
}

const getStatusColor = (status: Status): string => {
  const colors: Record<Status, string> = {
    'Ação Necessaria': 'bg-amber-100 text-amber-800 border-amber-200',
    'Demanda Concluída': 'bg-green-100 text-green-800 border-green-200',
    'Auto Emitido': 'bg-blue-100 text-blue-800 border-blue-200',
    'A.R. entregue': 'bg-cyan-100 text-cyan-800 border-cyan-200',
    'A.R. devolvido': 'bg-orange-100 text-orange-800 border-orange-200',
    'Demanda Agrupada': 'bg-gray-100 text-gray-800 border-gray-200',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

export const ProcessoTable = ({ processos, onView, onEdit, onDelete }: ProcessoTableProps) => {
  const handleDelete = (id: string, numeroDemanda: string) => {
    if (window.confirm(`Deseja realmente excluir o processo ${numeroDemanda}?`)) {
      onDelete(id);
    }
  };

  if (processos.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <p className="text-gray-500 text-lg">Nenhum processo encontrado</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Nº Demanda
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Nº SEI
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Postura
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                SQL
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Data Vistoria
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Endereço
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {processos.map((processo) => (
              <tr key={processo.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {processo.numeroDemanda}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {processo.numeroSEI}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  <span className="font-medium">{processo.postura}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {processo.sql}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {processo.dataVistoria}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      processo.status
                    )}`}
                  >
                    {processo.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">
                  {processo.endereco}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onView(processo)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Ver observações"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEdit(processo)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(processo.id, processo.numeroDemanda)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Excluir"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
