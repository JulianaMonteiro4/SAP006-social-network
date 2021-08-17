import { error } from './error.js';
import { navigateTo } from '../routes.js';
// import { firebaseConfig } from './firebaseconfig.js';

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

// MANTER CONECTADO
export const keepLogged = (persistence) => {
  firebase.auth().setPersistence(persistence)
    .then(() => {
    })
    .catch(() => {
      error('Não foi possível permanecer conectado(a)');
    });
};

export const blockNotLoggedUser = () => {
  firebase.auth().onAuthStateChanged((user) => {
    // console.log(user);
    if (!user && window.location.pathname === '/feed') {
      navigateTo('/');
    }
  });
};

// COLEÇÃO DE POSTS
export const postsCollection = () => firebase.firestore().collection('posts');

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
  // SALVAR POSTS NO BANCO DE DADOS
  return postsCollection().doc().set(post);
};

export const deletePost = (id) => {
  postsCollection().doc(id).delete();
};

/* export const editPost = (newPost, id) => {
  postsCollection().doc(id).update({
      text: newPost,
    });
}; */

// SIGN OUT
export const signOut = () => {
  firebase.auth().signOut()
    .then(() => {
      navigateTo('/');
      error('Até Logo');
    })
    .catch(() => {
      error('Tente novamente.');
    });
};

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
/* const makeUserColection = (userLogged) => {
    const usersCollection = firebase.firestore().collection('users');
    usersCollection.get().then((snap) => {
      snap.forEach((user) => {
        if (userLogged === user.data().id) {
          createPost(user.data().id, user.data().name, user.data().email);
        }
      });
    });
  }; */

/* PERFIL
export const saveUserUpdate = (name) => {
  firebase.auth().currentUser.updateProfile({
    displayName: name,
  })
    .then(() => true)
    .catch((error) => error);
};

export const saveUser = (user, userEmail, userName) => {
  firebase.firestore().collection('users').doc(userEmail).set({
    userId: user.uid,
    name: userName,
    email: userEmail
  })
    .then(() => true)
    .catch((error) => error);
}; */
