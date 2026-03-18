import { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  query, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../firebase'; // Certifique-se de que o arquivo firebase.ts exporta 'db'
import { Processo } from '../types';

const COLLECTION_NAME = 'controle-de-processos';

export const useProcessos = () => {
  const [processos, setProcessos] = useState<Processo[]>([]);
  const [loading, setLoading] = useState(true);

  // Sincronização em tempo real com o Firestore
  useEffect(() => {
    const q = query(collection(db, COLLECTION_NAME), orderBy('dataCriacao', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const listaProcessos = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      })) as Processo[];
      
      setProcessos(listaProcessos);
      setLoading(false);
    }, (error) => {
      console.error("Erro ao buscar processos:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const adicionarProcesso = async (processo: Omit<Processo, 'id' | 'dataCriacao' | 'dataAtualizacao'>) => {
    try {
      const agora = new Date().toISOString();
      await addDoc(collection(db, COLLECTION_NAME), {
        ...processo,
        dataCriacao: agora,
        dataAtualizacao: agora,
      });
    } catch (error) {
      console.error("Erro ao adicionar processo:", error);
      throw error;
    }
  };

  const atualizarProcesso = async (id: string, dados: Partial<Processo>) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        ...dados,
        dataAtualizacao: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Erro ao atualizar processo:", error);
      throw error;
    }
  };

  const excluirProcesso = async (id: string) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Erro ao excluir processo:", error);
      throw error;
    }
  };

  return {
    processos,
    loading,
    adicionarProcesso,
    atualizarProcesso,
    excluirProcesso,
  };
};