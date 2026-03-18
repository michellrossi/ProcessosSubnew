import { useState, useEffect } from 'react';
import { Processo, Postura, Status } from '../types';
import { validateSEI, validateSQL, formatDateToInput, formatInputToDate, autoFormatSEI, autoFormatSQL } from '../utils/validation';
import { X } from 'lucide-react';

interface ProcessoFormProps {
  onSubmit: (processo: Omit<Processo, 'id' | 'dataCriacao' | 'dataAtualizacao'>) => void;
  onCancel: () => void;
  processoInicial?: Processo;
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

export const ProcessoForm = ({ onSubmit, onCancel, processoInicial }: ProcessoFormProps) => {
  const [formData, setFormData] = useState({
    numeroDemanda: '',
    numeroSEI: '',
    postura: '' as Postura,
    sql: '',
    dataVistoria: '',
    endereco: '',
    status: 'Ação Necessaria' as Status,
    observacoes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (processoInicial) {
      setFormData({
        numeroDemanda: processoInicial.numeroDemanda,
        numeroSEI: processoInicial.numeroSEI,
        postura: processoInicial.postura,
        sql: processoInicial.sql,
        dataVistoria: formatDateToInput(processoInicial.dataVistoria),
        endereco: processoInicial.endereco,
        status: processoInicial.status,
        observacoes: processoInicial.observacoes,
      });
    }
  }, [processoInicial]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.numeroDemanda.trim()) {
      newErrors.numeroDemanda = 'Campo obrigatório';
    }

    if (!formData.numeroSEI.trim()) {
      newErrors.numeroSEI = 'Campo obrigatório';
    } else if (!validateSEI(formData.numeroSEI)) {
      newErrors.numeroSEI = 'Formato inválido. Use: xxxx.xxxx/xxxxxxx-x';
    }

    if (!formData.postura) {
      newErrors.postura = 'Campo obrigatório';
    }

    if (!formData.sql.trim()) {
      newErrors.sql = 'Campo obrigatório';
    } else if (!validateSQL(formData.sql)) {
      newErrors.sql = 'Formato inválido. Use: xxx.xxx.xxxx-x';
    }

    if (!formData.dataVistoria) {
      newErrors.dataVistoria = 'Campo obrigatório';
    }

    if (!formData.endereco.trim()) {
      newErrors.endereco = 'Campo obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        ...formData,
        dataVistoria: formatInputToDate(formData.dataVistoria),
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            {processoInicial ? 'Editar Processo' : 'Novo Processo'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nº Demanda *
              </label>
              <input
                type="text"
                value={formData.numeroDemanda}
                onChange={(e) => setFormData({ ...formData, numeroDemanda: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.numeroDemanda ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.numeroDemanda && (
                <p className="mt-1 text-sm text-red-500">{errors.numeroDemanda}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nº SEI * (apenas números)
              </label>
              <input
                type="text"
                value={formData.numeroSEI}
                onChange={(e) => setFormData({ ...formData, numeroSEI: autoFormatSEI(e.target.value) })}
                placeholder="12345678123456789"
                maxLength={18}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono ${
                  errors.numeroSEI ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <p className="mt-1 text-xs text-gray-500">Formato automático: xxxx.xxxx/xxxxxxx-x</p>
              {errors.numeroSEI && (
                <p className="mt-1 text-sm text-red-500">{errors.numeroSEI}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Postura *
              </label>
              <select
                value={formData.postura}
                onChange={(e) => setFormData({ ...formData, postura: e.target.value as Postura })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.postura ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Selecione...</option>
                {posturas.map((postura) => (
                  <option key={postura} value={postura}>
                    {postura}
                  </option>
                ))}
              </select>
              {errors.postura && (
                <p className="mt-1 text-sm text-red-500">{errors.postura}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SQL * (apenas números)
              </label>
              <input
                type="text"
                value={formData.sql}
                onChange={(e) => setFormData({ ...formData, sql: autoFormatSQL(e.target.value) })}
                placeholder="1234567890123"
                maxLength={13}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono ${
                  errors.sql ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <p className="mt-1 text-xs text-gray-500">Formato automático: xxx.xxx.xxxx-x</p>
              {errors.sql && (
                <p className="mt-1 text-sm text-red-500">{errors.sql}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data da Vistoria *
              </label>
              <input
                type="date"
                value={formData.dataVistoria}
                onChange={(e) => setFormData({ ...formData, dataVistoria: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.dataVistoria ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.dataVistoria && (
                <p className="mt-1 text-sm text-red-500">{errors.dataVistoria}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status *
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Status })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Endereço *
              </label>
              <input
                type="text"
                value={formData.endereco}
                onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.endereco ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.endereco && (
                <p className="mt-1 text-sm text-red-500">{errors.endereco}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Observações
              </label>
              <textarea
                value={formData.observacoes}
                onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {processoInicial ? 'Atualizar' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
