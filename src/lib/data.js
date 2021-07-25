// aqui você exportará as funções que precisa

//////////////////////////////AQUI VAI TUDO RELACIONADO AO FIREBASE///////////////////////////////

////////////////////Criar uma conta baseada em senha




///////////////////Login de usuários existentes
/*firebase.auth().signInWithEmailAndPassword(email, password)
   .then((userCredential) => {
     // Signed in
     const user = userCredential.user;
     // ...
   })
   .catch((error) => {
     const errorCode = error.code;
     const errorMessage = error.message;
   });*/


/////////////////Atualizar o perfil de um usuário
/*const user = firebase.auth().currentUser;
user.updateProfile({
  displayName: "Jane Q. User",
  photoURL: "https://example.com/jane-q-user/profile.jpg"
}).then(() => {
  // Update successful
  // ...
}).catch((error) => {
  // An error occurred
  // ...
});  */


///////////////////////Enviar um e-mail de verificação a um usuário
/*firebase.auth().currentUser.sendEmailVerification()
  .then(() => {
    // Email verification sent!
    // ...
  });*/


////////////////////Definir a senha de um usuário
/*const user = firebase.auth().currentUser;
const newPassword = getASecureRandomPassword();

user.updatePassword(newPassword).then(() => {
  // Update successful.
}).catch((error) => {
  // An error ocurred
  // ...
});*/


/////////////////////////Enviar um e-mail de redefinição de senha
/*firebase.auth().sendPasswordResetEmail(email)
  .then(() => {
    // Password reset email sent!
    // ..
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });*/


/////////////////////////////Excluir um usuário
/*const user = firebase.auth().currentUser;

user.delete().then(() => {
  // User deleted.
}).catch((error) => {
  // An error ocurred
  // ...
});*/


///////////////////////Conectar um usuário com endereço de e-mail e senha
/* firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });*/


///////////////////Para desconectar um usuário, chame signOut:
/*firebase.auth().signOut().then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});*/





///////Processar o fluxo de login com o SDK do Firebase
//1. Crie uma instância do objeto do provedor do Google:
//var provider = new firebase.auth.GoogleAuthProvider();

/*2.Para fazer login com uma janela pop-up, chame signInWithPopup:
firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    /*var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;*/
    // ...
  /*}).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });*/

// 3.Para redirecionar os usuários à página de login, chame signInWithRedirect:
//firebase.auth().signInWithRedirect(provider);


//Para fazer login com uma janela pop-up, chame linkWithPopup:
/*auth.currentUser.linkWithPopup(provider).then((result) => {
  // Accounts successfully linked.
  var credential = result.credential;
  var user = result.user;
  // ...
}).catch((error) => {
  // Handle Errors here.
  // ...
});*/


//Após usar os métodos de login, os usuários serão redirecionados novamente à sua página. Em seguida, recupere o resultado do login chamando getRedirectResult quando a página for carregada:
/*auth.getRedirectResult().then((result) => {
  if (result.credential) {
    // Accounts successfully linked.
    var credential = result.credential;
    var user = result.user;
    // ...
  }
}).catch((error) => {
  // Handle Errors here.
  // ...
});*/


//Vincular credenciais de provedor de autenticação federado a uma conta de usuário
//var googleProvider = new firebase.auth.GoogleAuthProvider();
//var emailProvider = new firebase.auth.EmailAuthProvider();




//export const myFunction = () => {
  // aqui vai seu código
  //console.log('Olá mundo!');
//};
