import { error } from './error.js';
import { navigateTo } from '../navegation.js';

// CRIAR UMA CONTA - (VERIFICAR ERRO COM SENHAS DIFERENTES)
export const newRegister = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password);
};

// LOGIN DE USUÁRIOS EXISTENTES
export const loginWithRegister = (email, password) => (
  firebase.auth().signInWithEmailAndPassword(email, password)
);

// LOGIN COM O GOOGLE
export const loginWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  const result = await firebase.auth().signInWithPopup(provider);
  navigateTo('/feed');
  return result;
};

// E-MAIL DE REDEFINIÇÃO DE SENHA
export const recoverPassword = (email) => firebase.auth().sendPasswordResetEmail(email);

// MANTER CONECTADO
export const keepLogged = (persistence) => {
  firebase.auth().setPersistence(persistence);
};

// BLOQUEAR NAVEGAÇÃO USUÁRIO PARA FEED SEM ESTAR CONECTADO
export const blockNotLoggedUser = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (!user && window.location.pathname === '/feed') {
      navigateTo('/');
    }
  });
};

// USUÁRIO
export const currentUser = () => firebase.auth().currentUser;

// COLEÇÃO DE POSTS
export const postsCollection = () => firebase.firestore().collection('posts');

// CRIAR POST NO FIREBASE
export const createPost = (text) => {
  const user = firebase.auth().currentUser;
  const post = {
    text: text.value,
    user_id: user.uid,
    likes: [],
    comments: [],
    data: new Date(),
  };
  // SALVAR POSTS NO BANCO DE DADOS
  return postsCollection().doc().set(post);
};
// nao usar remove pq ele retira o array e pula
// indexOf busca o indice no array
// AUMENTAR CURTIDAS
export const likesPost = (id) => {
  postsCollection().doc(id).get()
    .then((response) => {
      const numberLikes = response.data().likes;
      const user = firebase.auth().currentUser;
      if (numberLikes.includes(user.uid)) {
        const indexOfUid = numberLikes.indexOf(user.uid);
        console.log(indexOfUid);
        numberLikes.splice(indexOfUid, 1); // splice remove do array
        console.log(numberLikes);
        postsCollection().doc(id).update({ likes: [numberLikes] });
      } else {
        numberLikes.push(user.uid); // adiciona no array
        console.log(numberLikes);
        postsCollection().doc(id).update({ likes: numberLikes });// pegar o valor do reponse n array
      }
      console.log(numberLikes);
    })
    .catch(() => {});
};

// DELETAR POSTS DO BANCO DE DADOS
export const deletePost = (id) => {
  postsCollection().doc(id).delete();
};

// EDITAR POSTS DO BANCO DE DADOS
export const editPost = (newPost, id) => {
  postsCollection('post').doc(id).update({ text: newPost });
};

// SIGN OUT
export const signOut = () => {
  firebase.auth().signOut()
    .then(() => {
      // navigateTo('/');
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
