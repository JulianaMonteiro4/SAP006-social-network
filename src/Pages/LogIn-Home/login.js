////// MANIPULAÇÃO DO DOM DO LOGIN

import { loginWithGoogle } from './dataLogin.js'

export const loginMainScreen = () => {

    /*const loginPage = document.createElement('div');
    document.getElementById("root").appendChild(div).className('class1');
    loginPage.innerHTML = `  */

    document.querySelector('#root').innerHTML = `
    <div class="l-container-grid">
        <header class="header-grid">  
            <img class="logo-img" src="img/logo-nome.png" alt="logo"></img>
            <span class="phrase"> Aqui, onde até os memes socializam e você não. </span>
        </header>
        <section id="login" class="container-login">
            <h2 class="login">Login</h2>
            <form class="container-form" id="form-login">
                <input class="text-field" id="email" type="e-mail" placeholder="Insira seu e-mail"/> <i class="far fa-envelope"></i>
                <input class="text-field" id="password" type="password" placeholder="Insira sua senha"/> <i class="fas fa-unlock-alt"></i>
                <button class="btn" type="button" id="btn-login">Entrar</button>
                <span class="pswd-recover"> Esqueceu a senha? Recupere-a <a href="#"> Aqui</a>
                <div>
                    <img src="img/icone-google.png" class="btn-google" id="google" type="button" width="60px" height="60px>
                </div>
                <p class="phrase-google">Login com o Google</p>
            </form>
        </section> 
            
        <footer class="footer">
            <p> Desenvolvido por <a href="#"> Bianca </a>, <a href="#"> Juliana </a> e <a href="#"> Paloma</a>
        </footer>
    </div>
    `;


    /*const email = container.querySelector('#email');
    const senha = container.querySelector('#password');
    const btnLogin = container.querySelector('#btn-login');
    const btnLoginGoogle = container.querySelector('#btn-login-google'); */
}

loginMainScreen()



/////////////////////// BOTÃO LOGIN COM O GOOGLE /////////////////////////////
const btnLoginWithGoogle = document.getElementById("google")
btnLoginWithGoogle.addEventListener("click", loginWithGoogle)









/////////////////////////// JULIANA
function mostrarSenha () {
    const senha = document.getElementById("password");
    if (senha.type === "password") {
        senha.type = "text";
    }else {
        senha.type = "password"
    }
    senha.addEventListener("click", mostrarSenha());
}


///// PLANTÃO EVE - LAYS
export const Login = () => {
    const rootElement = document.createElement("div");
    rootElement.innerHTML = `<h1> babla </h1>
    <button id="cadastro"> Cadastre-se </button>`;
  
    console.log(rootElement)
  
    const botao = rootElement.querySelector("#cadastro")
    botao.addEventListener("click", () => {
      window.history.pushState({}, "", "/cadastro")
      const popstateEvent = new PopStateEvent("popstate", {state:{}})
      dispatchEvent(popstateEvent)
    })
  
    return rootElement;
  
  }