import { error } from './error.js';

// CRIAR UMA CONTA
export const newRegister = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      // console.log("logado");
      const user = userCredential.user; //
    })
    .catch(() => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // console.log('Erro no cadastro', errorCode, errorMessage);
    });
};

// LOGIN DE USUÁRIOS EXISTENTES COM OUTRO E-MAIL
export const loginWithRegister = (email, password) => {
  /* if (firebase.auth().currentUser){
    firebase.auth.signOut();
  }, */

  // console.log(email, password);
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
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

  firebase.auth().onAuthStateChanged ((firebaseUser) => {
    if (firebaseUser) {
      console.log (firebaseUser);
    } else {
      console.log('não logado');
    }
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
      // Password reset email sent!
    })
    .catch(() => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
};

// SIGN OUT

export const btnSignOut = () => {
  firebase.auth().signOut()
    .then(() => { })
    .catch(() => {
      error('Até logo');
    });
};

/* export const btnSignOut = () => {
  firebase.auth().signOut();
  window.location.hash = '';
  location.reload();
}; */

// EXCLUIR USUÁRIO
/* const auth = getAuth();
const user = auth.currentUser;
deleteUser(user).then(() => {
  // User deleted.
}).catch((error) => {
  // An error ocurred
  // ...
}); */
