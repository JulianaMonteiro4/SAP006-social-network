import { error } from './error.js';

// CRIAR UMA CONTA
export const newRegister = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // console.log("logado");
      const user = userCredential.user;
      console.log(user);
      error('Usuário cadastrado');
    })
    .catch(() => {
      error('Por favor insira um e-mail e senha');
      // console.log('Erro no cadastro');
    });
};

// LOGIN DE USUÁRIOS EXISTENTES COM OUTRO E-MAIL
export const loginWithRegister = (email, password) => {
  // console.log(email, password);
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      window.location.pathname = 'feed';
      // console.log(user);
      error('Usuário conectado');
      // window.location.replace('nome-da-pagina.html')
    })
    .catch(() => {
      error('Por favor insira uma conta existente ou cadastre-se');
    });
};

// LOGIN COM O GOOGLE
export const loginWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  const result = await firebase.auth().signInWithPopup(provider);
  return result;
};

// E-MAIL DE REDEFINIÇÃO DE SENHA
export const recoverPassword = (email) => {
  firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      error('E-mail para redefinição de senha enviado');
      // Password reset email sent!
    })
    .catch(() => {
      error('Por favor, insira um e-mail existente');
    });
};

// SIGN OUT
/* const auth = getAuth();
signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
}); */

// EXCLUIR USUÁRIO
/* const auth = getAuth();
const user = auth.currentUser;
deleteUser(user).then(() => {
  // User deleted.
}).catch((error) => {
  // An error ocurred
  // ...
}); */
