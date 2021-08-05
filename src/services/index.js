import { error } from './error.js';
import { getRoutes } from '../routes.js';

// CRIAR UMA CONTA - FUNCIONAND;
export const newRegister = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      window.location.replace('/');
      error('Usuário cadastrado');
    })
    .catch(() => {
      const errorCode = error.code;
      switch (errorCode) {
        case 'auth/email-already-in-use':
          error('Email em uso');
          break;
        case 'auth/invalid-email':
          error('Email inválido');
          break;
        case 'auth/weak-password':
          error('Senha fraca');
          break;
        default:
          error('Por favor, verifique as informações digitadas');
      }
    });
};

// LOGIN DE USUÁRIOS EXISTENTES - NÃO ESTÁ FUNCIONANDO
export const loginWithRegister = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      error('Usuário conectado');
    })
    .then(() => {
      setTimeout(() => {
        window.location.replace('feed');
      }, 1000);
    })
    .catch(() => {
      const errorCode = error.code;
      switch (errorCode) {
        case 'auth/wrong-password':
          error('Senha inválida');
          break;
        case 'auth/invalid-email':
          error('Email inválido');
          break;
        case 'auth/user-not-found':
          error('usuário não encontrado');
          break;
        default:
          error('Por favor insira uma conta existente ou cadastre-se');
      }
    });
};

/* export const getLoggedUser = () => {
    return firebase.auth().currentUser;
};

export const userStatus = () => {
  return new Promise ((res, rej) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        res(user);
      } else {
        rej();
      }
    });
  });
};
*/

// LOGIN COM O GOOGLE - FUNCIONANDO
export const loginWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  const result = await firebase.auth().signInWithPopup(provider);
  getRoutes('/feed');
  return result;
  // REDIRECIONAR PARA PG FEED.
};

// E-MAIL DE REDEFINIÇÃO DE SENHA - FUNCIONANDO (SÓ VERIFICAR COMO RECEBE E-MAIL)
export const recoverPassword = (email) => {
  firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      error('E-mail para redefinição de senha enviado');
    })
    .catch(() => {
      const errorCode = error.code;
      switch (errorCode) {
        case 'auth/invalid-email':
          error('Email inválido');
          break;
        case 'auth/user-not-found':
          error('Usuário não encontrado');
          break;
        default:
          error('Não será possível recuperar sua senha.');
      }
    });
};

// SIGN OUT - FUNCIONANDO
export const signOut = () => {
  firebase.auth().signOut()
    .then(() => {
      window.location.replace('/');
      error('Até Logo');
      // console.log('sai logo');
    })
    .catch(() => {
      error('Não saiu');
      // console.log('não foi dessa vez');
    });
};

export const keepLogged = (persistence) => {
  firebase.auth().setPersistence(persistence)
    .then(() => {
      const provider = new firebase.auth();
      return firebase.auth().signInWithRedirect(provider);
    })
    .catch(() => {
      error('Não foi possível permanecer conectado(a)');
    });
};
