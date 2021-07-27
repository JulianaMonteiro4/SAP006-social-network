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

/////////////////////// LOGIN DE USUÁRIOS EXISTENTES COM OUTRO E-MAIL/////////////////////////////
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


/////////////////////// BOTÃO DE ENTRAR /////////////////////////////
/*export const botaoAutenticar = async () => {
  let provider = new firebase.auth.GoogleAuthProvider();
  const result = await firebase.auth().signInWithPopup(provider)
  return result;
}*/


/////////////////////// LOGIN COM O GOOGLE /////////////////////////////
export const loginWithGoogle = async () => {
  let provider = new firebase.auth.GoogleAuthProvider();
  const result = await firebase.auth().signInWithPopup(provider)
  return result;
}

/////////////////////// LOGIN COM OUTRO E-MAIL /////////////////////////////
/*export const loginWithEmail = async () => {
  let provider = new firebase.auth.EmailAuthProvider();
  const result = await firebase.auth().signInWithPopup(provider)
  return result;
}*/


/////////////////////// E-MAIL DE REDEFINIÇÃO DE SENHA /////////////////////////////
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


/////////////////////// CADASTRO DE NOVOS USUÁRIOS /////////////////////////////



/////////////////////// RECUPERANDO OS DADOS DO LOGIN /////////////////////////////
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


