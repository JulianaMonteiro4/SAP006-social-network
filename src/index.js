// aqui você exportará as funções que precisa

export const myFunction = () => {
  // aqui vai seu código
  console.log('Olá mundo!');
};




const email = 'teste@email.com';
const password = '123456';

firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log ('deu bom', user)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('deu ruim', errorCode, errorMessage)
});