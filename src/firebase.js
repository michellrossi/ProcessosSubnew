// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Se for usar o banco de dados Firestore
import { getAuth } from "firebase/auth";           // Se for usar autenticação

const firebaseConfig = {
  apiKey: "AIzaSyALm6bbE9zBlxrP76mYimuZuJsY2hycdD0",
  authDomain: "controle-de-processos-e21e5.firebaseapp.com",
  projectId: "controle-de-processos-e21e5",
  storageBucket: "controle-de-processos-e21e5.firebasestorage.app",
  messagingSenderId: "236356647253",
  appId: "1:236356647253:web:a8b46bdf70499be2d7d7dc"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta as instâncias para usar no projeto
export const db = getFirestore(app);
export const auth = getAuth(app);