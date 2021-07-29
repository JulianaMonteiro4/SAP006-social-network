////// MANIPULAÇÃO DO DOM DO LOGIN

import { loginWithGoogle, loginWithRegister } from '../../services/index.js'

export const loginMainScreen = () => {

    const main = document.getElementById("root")
    main.innerHTML = "";
    const loginPage = document.createElement ("div");
    loginPage.setAttribute("class", "teste");
    loginPage.innerHTML =  `
   

        
        <section id="login" class="container-login">
            <h2 class="login">Login</h2>
            <div> 
                <img src="img/icone-cadastro.png" class="btn-cadastrar" id="cadastro" type="button">
            </div> 
            <form class="container-form" id="form-login">
                <input class="text-field" id="email" type="e-mail" placeholder="Insira seu e-mail"/>
                <span class="icons-login">
                    <i class="far fa-envelope"></i>
                </span>
                <input class="text-field" id="password" type="password" placeholder="Insira sua senha"/>
                <span class="icons-login">
                    <i class="fas fa-lock-open"></i>
                    <i class="fas fa-lock"></i>
                </span>
                <button class="btn" type="button" id="btn-login">Entrar</button>
                <span class="pswd-recover"> Esqueceu a senha? Recupere-a <a href="#"> Aqui</a></span>
                <div>
                    <img src="img/icone-google.png" class="btn-google" id="google" type="button">
                </div>
                <p class="phrase-google">Login com o Google</p>
            </form>
        </section> 
            
        
    
    `;


    const email = loginPage.querySelector('#email').value; 
    const password = loginPage.querySelector('#password').value; 

    const btnLogin = loginPage.querySelector('#btn-login');
    btnLogin.addEventListener("click", (e)=> { 
        e.preventDefault(),
        loginWithRegister(email,password)     
        }
    ); 

    const btnLoginWithGoogle = loginPage.querySelector("#google");   
    btnLoginWithGoogle.addEventListener("click", loginWithGoogle)
        
    
    return main.appendChild(loginPage);
};

//loginMainScreen()




/////////////////////// BOTÃO LOGIN COM O GOOGLE /////////////////////////////
//const btnLoginWithGoogle = document.getElementById("google")
//btnLoginWithGoogle.addEventListener("click", loginWithGoogle)



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


  //const loginPage = document.querySelector('#root').innerHTML = 