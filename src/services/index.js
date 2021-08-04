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
      error('Por favor insira um e-mail e senha');
    });
};

// LOGIN DE USUÁRIOS EXISTENTES - NÃO ESTÁ FUNCIONANDO
export const loginWithRegister = (email, password) => {
  /* if (firebase.auth().currentUser){
    firebase.auth.signOut();
  }, */

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      window.location.replace = ('/feed');
      error('Usuário conectado');
    })
  /*  .then ( () => {
      setTimeout ( () => {
        window.location.replace('feed')
      }, 1000),
    }) */
    .catch(() => {
      error('Por favor insira uma conta existente ou cadastre-se');
    });
};

export const getLoggedUser = () => {
    return firebase.auth().currentUser;
};

export const teste = () => {
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

// LOGIN COM O GOOGLE - FUNCIONANDO
export const loginWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  const result = await firebase.auth().signInWithPopup(provider);
  getRoutes('/feed');
  return result;
  // REDIRECIONAR PARA PG FEED.
};

// SIGN OUT
export const btnSignOut = () => {
  firebase.auth().signOut()
    .then(() => { 
      // window.location.replace('login')
    })
    .catch(() => {
      error('Até logo');
    });
};

// E-MAIL DE REDEFINIÇÃO DE SENHA - FUNCIONANDO (SÓ VERIFICAR COMO RECEBE E-MAIL)
export const recoverPassword = (email) => {
  firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      error('E-mail para redefinição de senha enviado');
    })
    .catch(() => {
      error('Por favor, insira um e-mail existente');
    });
};

// SIGN OUT - FUNCIONANDO
export const signOut = () => {
  firebase.auth().signOut()
    .then(() => {
      window.location.replace = ('/');
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
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};
