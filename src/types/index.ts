export type Postura =
  | 'ATIVIDADE'
  | 'OBRAS'
  | 'MPL'
  | 'POP'
  | 'Falta de AFLR'
  | 'Acessibilidade'
  | 'Limpeza'
  | 'SABESP'
  | 'Área Pública'
  | 'Invasão'
  | 'Ambulante'
  | 'Equipamento'
  | 'Recurso Multa'
  | 'COMGÁS'
  | 'Publicidade'
  | 'Comando Noturno'
  | 'Manejo Arbóreo';

export type Status =
  | 'Ação Necessaria'
  | 'Demanda Concluída'
  | 'Auto Emitido'
  | 'A.R. entregue'
  | 'A.R. devolvido'
  | 'Demanda Agrupada';

export interface Processo {
  id: string;
  numeroDemanda: string;
  numeroSEI: string;
  postura: Postura;
  sql: string;
  dataVistoria: string;
  endereco: string;
  status: Status;
  observacoes: string;
  dataCriacao: string;
  dataAtualizacao: string;
}

export interface DashboardStats {
  total: number;
  porPostura: Record<Postura, number>;
  porStatus: Record<Status, number>;
}
