import { error } from './error.js';

export const registerUser = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      // console.log("logado");
      const user = userCredential.user; //
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // console.log('Erro no cadastro', errorCode, errorMessage);
    });
};

// LOGIN DE USUÁRIOS EXISTENTES COM OUTRO E-MAIL/////////////////////////////
export const loginWithRegister = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      error('Usuário conectado');
      // window.location.replace('nome-da-pagina.html')
    })
    .catch((error) => {
      error('Por favor insira uma conta existente');
    });
};

// LOGIN COM O GOOGLE /////////////////////////////
export const loginWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  const result = await firebase.auth().signInWithPopup(provider);
  return result;
};

// E-MAIL DE REDEFINIÇÃO DE SENHA /////////////////////////////
/* firebase.auth().sendPasswordResetEmail(email)
  .then(() => {
    // Password reset email sent!
    // ..
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  }); */

// RECUPERANDO OS DADOS DO LOGIN /////////////////////////////
/* auth.getRedirectResult().then((result) => {
  if (result.credential) {
    // Accounts successfully linked.
    var credential = result.credential;
    var user = result.user;
    // ...
  }
}).catch((error) => {
  // Handle Errors here.
  // ...
}); */
