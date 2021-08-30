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

// export const photoURL = () => firebase.auth().currentUser.photoURL;

// COLEÇÃO DE POSTS
export const postsCollection = () => firebase.firestore().collection('posts');

// FORMATAR A DATA
const postData = () => {
  const data = new Date();
  return data.toLocaleString('pt-BR');
};

// CRIAR POST NO FIREBASE
export const createPost = (text) => {
  const user = firebase.auth().currentUser;
  const post = {
    user_img: user.photoURL,
    user_id: user.uid,
    data: postData(),
    text: text.value,
    likes: [],
    comments: [],
    rating: [],
  };
  // SALVAR POSTS NO BANCO DE DADOS
  return postsCollection().doc().set(post);
};
// nao usar remove pq ele retira o array e pula
// indexOf busca o indice no array
// splice remove do array
// AUMENTAR CURTIDAS
export const likesPost = (id) => postsCollection().doc(id).get()
  .then((response) => {
    const numberLikes = response.data().likes;
    const user = firebase.auth().currentUser;
    if (numberLikes.includes(user.uid)) {
      const indexOfUid = numberLikes.indexOf(user.uid);
      numberLikes.splice(indexOfUid, 1);
      return postsCollection().doc(id).update({ likes: numberLikes });
    }
    numberLikes.push(user.uid); // adiciona no array
    return postsCollection().doc(id).update({ likes: numberLikes });
  })
  .catch(() => {});

// DELETAR POSTS DO BANCO DE DADOS
export const deletePost = (id) => postsCollection().doc(id).delete();

// EDITAR POSTS DO BANCO DE DADOS
export const editPost = (newPost, id) => {
  postsCollection('post').doc(id).update({ text: newPost });
};

// SIGN OUT
export const signOut = () => firebase.auth().signOut();

// ADICIONAR IMAGEM NO POST
export const updatePost = (post, id) => firebase.firestore().collection('posts').doc(id).update(post);

export const uploadPicture = (namePicture, file) => firebase.storage().ref(`post/${namePicture}`).put(file);

// eslint-disable-next-line no-shadow
export const downloadPicture = (namePicturePost, id) => {
  firebase.storage().ref().child(`post/${namePicturePost}`).getDownloadURL()
    .then((url) => {
      const picturePost = {
        photo: url,
      };
      updatePost(picturePost, id);
    });
};

// ADICIONAR IMAGEM NO PERFIL
export const updatePhotoProfile = (userId, file) => firebase.storage().ref(`imageProfile/${userId}`).put(file);

export const dowloadPhotoProfile = (userId) => firebase.storage().ref().child(`imageProfile/${userId}`).getDownloadURL();

/* export const uploadFoodPhoto = (file) => {
  // create storage ref
  const storeageRef = firebase.storage().ref(`userRecipePhoto/ ${file.name}`);

  // upload file
  const task = storeageRef.put(file);
  return task;
}; */

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
