import { error } from './error.js';
import { navigateTo } from '../routes.js';
// import { dataFirestore } from './firebaseconfig.js';

// CRIAR UMA CONTA - (VERIFICAR ERRO COM SENHAS DIFERENTES)
export const newRegister = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      navigateTo('/');
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

// LOGIN DE USUÁRIOS EXISTENTES
export const loginWithRegister = (email, password) => (
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      error('Usuário conectado');
    })
    .then(() => {
      setTimeout(() => {
      }, 1000);
    })
);

// LOGIN COM O GOOGLE
export const loginWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  const result = await firebase.auth().signInWithPopup(provider);
  navigateTo('/feed');
  return result;
};

// E-MAIL DE REDEFINIÇÃO DE SENHA
export const recoverPassword = (email) => {
  firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      window.location.replace('/');
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

// SIGN OUT
export const signOut = () => {
  firebase.auth().signOut()
    .then(() => {
      window.location.replace('/');
      error('Até Logo');
    })
    .catch(() => {
      error('Não saiu');
    });
};

// MANTER CONECTADO
export const keepLogged = (persistence) => {
  firebase.auth().setPersistence(persistence)
    .then(() => {
      // const provider = new firebase.auth();
      // return firebase.auth().signInWithRedirect(provider);
    })
    .catch(() => {
      error('Não foi possível permanecer conectado(a)');
    });
};

// export const createNewPost = (post) => firebase.firestore().collection('posts').add(post);

// export const postsCollection = firebase.firestore().collection('posts').get();

// LIKES NOS POSTS
// const firestorePP = firebase.firestore();
/* const likesCollection = firestore.collection('likes');

export const likedPost = () => likesCollection.add({
  liked: true,
})
  .then(() => true)
  .catch((error) => error);

export const comentPost = (comment) => {
  console.log(comment);
  return likesCollection.add({
    liked: true,
  })
    .then(() => true)
    .catch((error) => error);
}; */

/* // CRIAR DADOS EM UM USUÁRIO
dataFirestore.collection('users').add({
  name: inputNome.value,
  idUser: userCredential.uid,
})
  .then((docRef) => {
    console.log('Document written with ID: ', docRef.id);
  })
  .catch((error) => {
    console.error('Error adding document: ', error);
  });
*/

export const userStatus = () => (
  new Promise ((res, rej) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        res(user);
      } else {
        rej();
      }
    });
  })
);

// const user = firebase.auth().currentUser