// COLOCAR AS ROTAS DO SITE (SPA)
// COMO VAI ABRIR 
// HASH
// HISTORY API



///// PLANTÃO EVE - LAYS
import { Cadastro } from "./pages/cadastro.js";
import { Login } from "./pages/login.js"

const routRender = () => {
  const elemento = document.getElementById("root");
  const routes = {
    "/":Login,
    "/cadastro":Cadastro
  }
  elemento.innerHTML = "";
  elemento.appendChild(routes[window.location.pathname]())
 /* elemento.appendChild(routes["abacaxi"]())*/
  console.log(window.location.pathname)
}

window.addEventListener("popstate", routRender);
window.addEventListener("load", () => {
  /*window.history.pushState({},"","/")*/
  routRender();
  console.log("caiuuuuu no load")

} )




