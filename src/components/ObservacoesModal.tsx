import { Processo } from '../types';
import { X, Calendar, MapPin, FileText, Tag } from 'lucide-react';

interface ObservacoesModalProps {
  processo: Processo;
  onClose: () => void;
}

export const ObservacoesModal = ({ processo, onClose }: ObservacoesModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Detalhes do Processo</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-1">
                <FileText className="w-4 h-4" />
                Nº Demanda
              </label>
              <p className="text-lg font-semibold text-gray-900">{processo.numeroDemanda}</p>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-1">
                <FileText className="w-4 h-4" />
                Nº SEI
              </label>
              <p className="text-lg font-semibold text-gray-900">{processo.numeroSEI}</p>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-1">
                <Tag className="w-4 h-4" />
                Postura
              </label>
              <p className="text-lg font-semibold text-gray-900">{processo.postura}</p>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-1">
                <FileText className="w-4 h-4" />
                SQL
              </label>
              <p className="text-lg font-semibold text-gray-900">{processo.sql}</p>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-1">
                <Calendar className="w-4 h-4" />
                Data da Vistoria
              </label>
              <p className="text-lg font-semibold text-gray-900">{processo.dataVistoria}</p>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-1">
                <Tag className="w-4 h-4" />
                Status
              </label>
              <p className="text-lg font-semibold text-gray-900">{processo.status}</p>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-1">
              <MapPin className="w-4 h-4" />
              Endereço
            </label>
            <p className="text-lg text-gray-900">{processo.endereco}</p>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Observações
            </label>
            {processo.observacoes ? (
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-gray-700 whitespace-pre-wrap">{processo.observacoes}</p>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-gray-500 italic">Nenhuma observação registrada</p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-gray-200 text-xs text-gray-500 space-y-1">
            <p>Criado em: {new Date(processo.dataCriacao).toLocaleString('pt-BR')}</p>
            <p>Última atualização: {new Date(processo.dataAtualizacao).toLocaleString('pt-BR')}</p>
          </div>
        </div>

        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
