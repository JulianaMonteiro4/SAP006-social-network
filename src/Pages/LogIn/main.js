// import { } from './data'



export const loginMainScreen = () => {

    /*const loginPage = document.createElement('div');
    document.getElementById("root").appendChild(div).className('class1');
    loginPage.innerHTML = `  */

    document.querySelector('#root').innerHTML = ` 
    <header class='title'>  
        <h1 class='title main-title'>MS&U</h1> 
        <span class='title phrase'> Aqui onde os memes socializam e você não. </span>
    </header>
    <section id="login" class="login">
        <h2>Login</h2>
        <form id="form-login">
            <input id="email" type ="e-mail" placeholder="Insira seu e-mail" class="text-field">
            <input id="password" type="password" placeholder="Insira sua senha" class="text-field">
            <span class="pswd-recover"> Esqueceu sua senha? Recupere <a href="#"> Aqui</a>
            <button type="button" id="btn-login" class="btn">Entrar</button>
            <button type="button" id="btn-login-google" class="btn"> Google</button>
        </form>
    </section> 
    <footer class="footer">
        <p> Desenvolvido por <a href="#"> Bianca </a>, <a href="#"> Juliana </a> e <a href="#"> Paloma</a>
    </footer>
    `;


    /*const email = container.querySelector('#email');
    const senha = container.querySelector('#password');
    const btnLogin = container.querySelector('#btn-login');
    const btnLoginGoogle = container.querySelector('#btn-login-google'); */


}

loginMainScreen()



/// registrar

/* export const registerUser = () {
    document.querySelector('#root').innerHTML = ` 
    <header class='title'>  
        <h1 class='title main-title'>MS&U</h1> 
        <span class='title phrase'> Aqui onde os memes socializam e você não. </span>
    </header>
    <section class="register">
        <h2>Registrar</h2>
        <form class="form-register">
            <input type="email" placeholder="Insira um e-mail" id="register-email">
            <input type="password" placeholder="Insira uma senha" id="register-password">
            <input type="password" placeholder="Repita sua senha" id="register-password">
            <button type="button" id="btn-register" class="btn">Cadastrar</button>
        </form>
    </section> 
    <footer class="footer">
        <p> Desenvolvido por <a href="#"> Bianca </a>, <a href="#"> Juliana </a> e <a href="#"> Paloma</a>
    </footer>

    `
} */




/////////////////////////// JULIANA
function mostrarSenha () {
    const senha = document.getElementById("password");
    if (senha.type === "password") {
        senha.type = "text";
    }else {
        senha.type = "password"
    }
}
