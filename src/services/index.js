import { error } from './error.js';
import { navigateTo } from '../routes.js';
// import { dataFirestore } from './firebaseconfig.js';

// CRIAR UMA CONTA - (VERIFICAR ERRO COM SENHAS DIFERENTES)
export const newRegister = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      error('Usuário cadastrado');
    });
}; // fazer IF ELSE PARA SENHAS DIFERENTES

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
      error('E-mail para redefinição de senha enviado');
    });
};

// SIGN OUT
export const signOut = () => {
  firebase.auth().signOut()
    .then(() => {
      navigateTo('/');
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
    })
    .catch(() => {
      error('Não foi possível permanecer conectado(a)');
    });
};

// CRIAR POST NO FIREBASE
export const createPost = (text) => {
  const user = firebase.auth().currentUser;
  const post = {
    text: text.value,
    user_id: user.uid,
    likes: 0,
    comments: [],
    data: new Date(),
  };
  // salvar post no Banco de dados.
  const createCollectionOfPosts = firebase.firestore().collection('posts');
  return createCollectionOfPosts.doc().set(post);
};

export const postsCollection = firebase.firestore().collection('posts').orderBy('data', 'desc').get();

// export const createNewPost = (post) => firebase.firestore().collection('posts').add(post);

// export const postsCollection = firebase.firestore().collection('posts').get();

/* export const likedPost = () => likesCollection.add({
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

/* export const userStatus = () => (
  new Promise((res, rej) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        res(user);
      } else {
        rej();
      }
    });
  })
); */