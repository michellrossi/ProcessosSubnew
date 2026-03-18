import { useState, useMemo } from 'react';
import { useProcessos } from './hooks/useProcessos';
import { Processo, Postura, Status } from './types';
import { Dashboard } from './components/Dashboard';
import { ProcessoForm } from './components/ProcessoForm';
import { ProcessoTable } from './components/ProcessoTable';
import { Filters } from './components/Filters';
import { Analytics } from './components/Analytics';
import { ObservacoesModal } from './components/ObservacoesModal';
import { Plus, ClipboardList } from 'lucide-react';

function App() {
  const { processos, adicionarProcesso, atualizarProcesso, excluirProcesso } = useProcessos();

  const [mostrarForm, setMostrarForm] = useState(false);
  const [processoEditando, setProcessoEditando] = useState<Processo | undefined>();
  const [processoVisualizando, setProcessoVisualizando] = useState<Processo | undefined>();

  const [busca, setBusca] = useState('');
  const [statusFiltro, setStatusFiltro] = useState<Status | 'TODOS'>('TODOS');
  const [posturaFiltro, setPosturaFiltro] = useState<Postura | 'TODAS'>('TODAS');

  const processosFiltrados = useMemo(() => {
    return processos.filter((processo) => {
      const matchStatus = statusFiltro === 'TODOS' || processo.status === statusFiltro;
      const matchPostura = posturaFiltro === 'TODAS' || processo.postura === posturaFiltro;

      const matchBusca =
        !busca ||
        processo.numeroDemanda.toLowerCase().includes(busca.toLowerCase()) ||
        processo.numeroSEI.toLowerCase().includes(busca.toLowerCase()) ||
        processo.postura.toLowerCase().includes(busca.toLowerCase()) ||
        processo.sql.toLowerCase().includes(busca.toLowerCase()) ||
        processo.dataVistoria.toLowerCase().includes(busca.toLowerCase()) ||
        processo.endereco.toLowerCase().includes(busca.toLowerCase()) ||
        processo.status.toLowerCase().includes(busca.toLowerCase()) ||
        processo.observacoes.toLowerCase().includes(busca.toLowerCase());

      return matchStatus && matchPostura && matchBusca;
    });
  }, [processos, statusFiltro, posturaFiltro, busca]);

  const handleSubmitForm = (dados: Omit<Processo, 'id' | 'dataCriacao' | 'dataAtualizacao'>) => {
    if (processoEditando) {
      atualizarProcesso(processoEditando.id, dados);
    } else {
      adicionarProcesso(dados);
    }
    setMostrarForm(false);
    setProcessoEditando(undefined);
  };

  const handleEdit = (processo: Processo) => {
    setProcessoEditando(processo);
    setMostrarForm(true);
  };

  const handleCancelForm = () => {
    setMostrarForm(false);
    setProcessoEditando(undefined);
  };

  const handleView = (processo: Processo) => {
    setProcessoVisualizando(processo);
  };

  const handleCloseView = () => {
    setProcessoVisualizando(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <ClipboardList className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Controle de Processos Administrativos
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Sistema de gestão e acompanhamento de processos
                </p>
              </div>
            </div>
            <button
              onClick={() => setMostrarForm(true)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Plus className="w-5 h-5" />
              Novo Processo
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Dashboard processos={processos} />

        <Filters
          busca={busca}
          statusFiltro={statusFiltro}
          posturaFiltro={posturaFiltro}
          onBuscaChange={setBusca}
          onStatusChange={setStatusFiltro}
          onPosturaChange={setPosturaFiltro}
        />

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Lista de Processos</h2>
            <span className="text-sm text-gray-600">
              {processosFiltrados.length} de {processos.length} processo(s)
            </span>
          </div>
          <ProcessoTable
            processos={processosFiltrados}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={excluirProcesso}
          />
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Análise de Dados</h2>
          <Analytics processos={processos} />
        </div>
      </main>

      {mostrarForm && (
        <ProcessoForm
          onSubmit={handleSubmitForm}
          onCancel={handleCancelForm}
          processoInicial={processoEditando}
        />
      )}

      {processoVisualizando && (
        <ObservacoesModal processo={processoVisualizando} onClose={handleCloseView} />
      )}
    </div>
  );
}

export default App;
