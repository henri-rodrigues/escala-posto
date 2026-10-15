// Configuração do Firebase (Console do Firebase > Configurações do projeto > Seus apps > App da Web).
// Enquanto estiver null, o site salva os dados só no navegador de quem usa.
// Esses valores identificam o projeto e podem ficar públicos; quem protege os dados são as regras do Firestore.
window.FIREBASE_CONFIG = null;
/* Exemplo, depois de criar o projeto:
window.FIREBASE_CONFIG = {
  apiKey: "...",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "...",
  appId: "..."
};
*/
