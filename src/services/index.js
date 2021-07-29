
const email = ""
const senha = ""


export const register = (email, password) => { 
  firebase.auth().createUserWithEmailAndPassword(email, password) 
  .then((userCredential) => { 
    // Signed in 
    console.log("logado") 
    const user = userCredential.user; //
  }) 
  .catch((error) => { 
    const errorCode = error.code; 
    const errorMessage = error.message; 
    //console.log('Erro no cadastro', errorCode, errorMessage); 
  }); 
} 

/////////////////////// LOGIN DE USUÁRIOS EXISTENTES COM OUTRO E-MAIL/////////////////////////////
export const loginWithRegister = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
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
}

/////////////////////// LOGIN COM O GOOGLE /////////////////////////////
export const loginWithGoogle = async () => {
  let provider = new firebase.auth.GoogleAuthProvider();
  const result = await firebase.auth().signInWithPopup(provider)
  return result;
}



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
