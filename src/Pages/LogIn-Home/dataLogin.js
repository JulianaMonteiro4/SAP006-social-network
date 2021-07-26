//TUDO RELACIONADO A PAGINA DE LOGIN 
// LOGIN COM OUTRO E-MAIL
// SENHA PARA LOGIN
// LOGIN COM O GOOGLE
// REDEFINIÇÃO DE SENHA
// BOTÃO PARA CADASTRAR


/////////////////////// CRIAR NOVOS USUÁRIOS NO FIREBASE/////////////////////////////
const email = "testestes@email.com"
const senha = "senhasenha"

firebase.auth().createUserWithEmailAndPassword(email, senha)
  .then((userCredential) => {
  // Signed in
  const user = userCredential.user;
  //console.log('Cadastro realizado com sucesso', user);
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  //console.log('Erro no cadastro', errorCode, errorMessage);
});

/////////////////////// LOGIN DE USUÁRIOS EXISTENTES/////////////////////////////
firebase.auth().signInWithEmailAndPassword(email, senha)
   .then((userCredential) => {
     // Signed in
     const user = userCredential.user;
     alert(`Usuário conectado`, user);
     //window.location.replace('nome-da-pagina.html')
   })
   .catch((error) => {
     const errorCode = error.code;
     const errorMessage = error.message;
     alert(`Por favor insira uma conta existente`, errorCode, errorMessage)
   });



//////////// DUVIDA TAUANA
/*export const signInWithGoogle = async () => {
  let provider = new firebase.auth.GoogleAuthProvider();
  const result = await firebase.auth().signInWithPopup(provider)
  return result;
}*/
   


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



