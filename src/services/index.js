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

// COLEÇÃO DE USUÁRIOS
export const usersCollection = () => firebase.firestore().collection('users');

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
    nameUser: user.displayName,
    data: postData(),
    text: text.value,
    likes: [],
    comments: [],
    rating: [],
  };

  // SALVAR POSTS NO BANCO DE DADOS
  return postsCollection().doc().set(post);
};

// AUMENTAR CURTIDAS
export const likesPost = (id) => postsCollection().doc(id).get()
  .then((response) => {
    const numberLikes = response.data().likes;
    const user = firebase.auth().currentUser;
    if (numberLikes.includes(user.uid)) {
      const indexOfUid = numberLikes.indexOf(user.uid); // indexOf busca o indice no array
      numberLikes.splice(indexOfUid, 1); // splice remove do array
      return postsCollection().doc(id).update({ likes: numberLikes });
    }
    numberLikes.push(user.uid); // push adiciona no array
    return postsCollection().doc(id).update({ likes: numberLikes });
  })
  .catch(() => {});

// DELETAR POSTS DO BANCO DE DADOS
export const deletePost = (id) => postsCollection().doc(id).delete();

// EDITAR POSTS DO BANCO DE DADOS
export const editPost = (newPost, id) => {
  postsCollection('post').doc(id).update({ text: newPost });
};

// export const storageRef = firebase.storage.ref();

// SIGN OUT
export const signOut = () => firebase.auth().signOut();

// ADICIONAR IMAGEM NO POST
export const updatePost = (post, id) => firebase.firestore().collection('posts').doc(id).update(post);

export const uploadPicture = (namePicture, file) => firebase.storage().ref(`post/${namePicture}`).put(file);

// INSERIR IMAGEM NO FIREBASE
export const downloadPicturePost = (namePicturePost, id) => {
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

/* // CRIAR USUÁRIOS FIREBASE
export const createUsers = (imageUrl) => {
  const user = firebase.auth().currentUser;
  const users = {
    user_name: user.name,
    profile_picture: imageUrl,
    email: user.email.value,
  };
  // SALVAR USUÁRIO NO BANCO DE DADOS
  return postsCollection().doc().set(users);
}; */

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
