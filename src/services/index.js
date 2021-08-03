import { error } from './error.js';

// CRIAR UMA CONTA
export const newRegister = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // se cadastro der certo eu quero que me direcione para ... colocar pg login;
      // window.location.replace('login')
      console.log(user);
      error('Usuário cadastrado');
    })
    .catch(() => {
      error('Por favor insira um e-mail e senha');
      // console.log('Erro no cadastro');
    });
};

// LOGIN DE USUÁRIOS EXISTENTES
export const loginWithRegister = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // se login der certo eu quero que me direcione para ... colocar pg feed;
      // window.location.replace('feed')
      // console.log(user);
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

  /* firebase.auth().onAuthStateChanged ((firebaseUser) => {
    if (firebaseUser) {
      console.log (firebaseUser);
    } else {
      console.log('não logado');
    }
  }); */
};

// LOGIN COM O GOOGLE
export const loginWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  const result = await firebase.auth().signInWithPopup(provider);
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
