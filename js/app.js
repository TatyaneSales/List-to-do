/*
* Sisteminha de Lista de compras

! TODO: Adicionar evento para itens clicáveis (checkbox e close)
! TODO: Uso de indices em eventos para itens clicáveis.
! TODO: Salvar informações no LocalStorage com JSON
! TODO: Usar JSON para acessar as informações já armazenadas no LocalStorage.
*/

const listaCompras = document.querySelector("#listaCompras");
const itemCompra = document.querySelector("#itemCompra");
const btnEnvio = document.querySelector("#btnEnvio");

const getBanco = () => {
if (localStorage.getItem("listaCompra")){
  return JSON.parse(localStorage.getItem("listaCompra"));
}  else{
  return[];
}
};
const banco = getBanco();
const adicionarItem = (item, status = "", index) =>{
    let elemento = document.createElement('div');
    elemento.classList.add('row');
    elemento.innerHTML = ` <div class="input-group mb-3">
    <div class="input-group-text">
      <input
        class="form-check-input mt-0"
        type="checkbox"
        ${status}
        data-index= "${index}"
        value=""
        aria-label="Caixa de Seleção do Item"
      />
    </div>
    <input
      type="text"
      class="form-control"
      disabled
      aria-label="Item da lista"
      value="${item}"
    />
    <span type="close" data-index= "${index}" class="input-group-text" role="button"
      ><ion-icon type="close" data-index= "${index}" name="close-outline"></ion-icon
    ></span>
    </div>`;
    listaCompras.appendChild(elemento);
};

const atualizarLista = () => {
  limparLista();
  banco.forEach((obj, index)=> adicionarItem (obj.nome, "", index));
};
const limparLista = () => {
  while(listaCompras.firstChild){
  listaCompras.removeChild(listaCompras.lastChild);
}
};
const inserirNoBanco = (evento) => {
  if(itemCompra.value =! ""){
    if (evento.type == "keypress"){
      let tecla = evento.key;
      if (tecla ==="Enter"){
        banco.push({nome: itemCompra.value, status: ""});
        atualizarLista();
        itemCompra.value= "";
      }
    }else if (evento.type == "click"){
        banco.push({nome: itemCompra.value, status: ""});
        atualizarLista();
        itemCompra.value= "";
    }
  }
};

const clicavel = (evento) => {
let elemento = evento.target;
if(elemento.getAttribute("type") == "checkbox"){
 if (banco[elemento.dataset.index].status = "checked"){
  banco[elemento.dataset.index].status = "";
 } else{
  banco[elemento.dataset.index].status = "checked";
 }
} else if (elemento.getAttribute("type") == "close"){
  banco.splice(elemento.dataset.index, 1);
  atualizarLista();
}
};

itemCompra.addEventListener("keypress", inserirNoBanco)
btnEnvio.addEventListener("click", inserirNoBanco);
listaCompras.addEventListener("click", clicavel);
atualizarLista();