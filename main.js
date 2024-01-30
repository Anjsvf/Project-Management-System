// selecionar os elementos pelo Dom

const formProjeto = document.getElementById("form-projeto");
const nomeProjeto = document.getElementById("nome-projeto");
const descricaoProjeto = document.getElementById("descricao-projeto");
const botaoProjeto = document.getElementById("botao-projeto");
const listaProjetos = document.getElementById("lista-projetos");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const tituloProjeto = document.getElementById("titulo-projeto");
const textoProjeto = document.getElementById("texto-projeto");
const botaoEditarProjeto = document.getElementById("botao-editar-projeto");
const botaoExcluirProjeto = document.getElementById("botao-excluir-projeto");
const formTarefa = document.getElementById("form-tarefa");
const tituloTarefa = document.getElementById("titulo-tarefa");
const prioridadeTarefa = document.getElementById("prioridade-tarefa");
const statusTarefa = document.getElementById("status-tarefa");
const botaoTarefa = document.getElementById("botao-tarefa");
const filtro = document.getElementById("filtro");
const filtroTarefa = document.getElementById("filtro-tarefa");
const botaoFiltro = document.getElementById("botao-filtro");
const listaTarefas = document.getElementById("lista-tarefas")

let projetos = [];

let projetoAtual = null;



function gerarId() {
  return Math.random().toString(36).substr(2, 9);
}

// Criando uma função para salvar os projetos no localStorage
function salvarProjetos() {
  localStorage.setItem("projetos", JSON.stringify(projetos));
}

// Criando uma função para carregar os projetos do localStorage
function carregarProjetos() {
  projetos = JSON.parse(localStorage.getItem("projetos")) || [];
  mostrarProjetos();
}


// Criando uma função para mostrar os projetos na página
function mostrarProjetos() {
  // Limpando a lista de projetos
  listaProjetos.innerHTML = "";

  // Percorrendo o array de projetos
  for (let projeto of projetos) {
    // Criando um elemento div para cada projeto
    let divProjeto = document.createElement("div");
    divProjeto.className = "projeto";
    divProjeto.id = projeto.id;

    // Criando um elemento h2 para o nome do projeto
    let h2Projeto = document.createElement("h2");
    h2Projeto.textContent = projeto.nome;

    // Criando um elemento p para a descrição do projeto
    let pProjeto = document.createElement("p");
    pProjeto.textContent = projeto.descricao;

    // Criando um elemento button para mostrar as tarefas do projeto
    let buttonProjeto = document.createElement("button");
    buttonProjeto.textContent = "Mostrar Tarefas";
    buttonProjeto.addEventListener("click", mostrarTarefas);

    // Adicionando os elementos ao div do projeto
    divProjeto.appendChild(h2Projeto);
    divProjeto.appendChild(pProjeto);
    divProjeto.appendChild(buttonProjeto);

    // Adicionando o div do projeto à lista de projetos
    listaProjetos.appendChild(divProjeto);
  }
}


// Criando uma função para criar um novo projeto
function criarProjeto(event) {
  // Prevenindo o comportamento padrão do formulário
  event.preventDefault();

  // Verificando se os campos do formulário estão preenchidos
  if (nomeProjeto.value && descricaoProjeto.value) {
    // Criando um objeto para o novo projeto
    let novoProjeto = {
      id: gerarId(),
      nome: nomeProjeto.value,
      descricao: descricaoProjeto.value,
      tarefas: [],
    };

    // Adicionando o novo projeto ao array de projetos
    projetos.push(novoProjeto);

    // Salvando os projetos no localStorage
    salvarProjetos();

    // Mostrando os projetos na página
    mostrarProjetos();

    // Limpando os campos do formulário
    nomeProjeto.value = "";
    descricaoProjeto.value = "";
  } else {
    // Mostrando uma mensagem de alerta
    alert("Por favor, preencha todos os campos do formulário.");
  }
}

// função para mostrar as tarefas de um projeto

// Criando uma função para mostrar as tarefas de um projeto
function mostrarTarefas(event) {
  // Selecionando o div do projeto clicado
  let divProjeto = event.target.parentElement;

  // Buscando o projeto pelo id
  let projeto = projetos.find((projeto) => projeto.id === divProjeto.id);

  // Atribuindo o projeto à variável projetoAtual
  projetoAtual = projeto;

  // Mostrando o nome e a descrição do projeto no modal
  tituloProjeto.textContent = projeto.nome;
  textoProjeto.textContent = projeto.descricao;

  // Mostrando as tarefas do projeto no modal
  mostrarTarefasProjeto();

  // Mostrando o modal na página
  modal.style.display = "block";
}

// função para mostrar tarefas de um projeto no modal

// Criando uma função para mostrar as tarefas de um projeto no modal
function mostrarTarefasProjeto() {
  // Limpando a lista de tarefas
  listaTarefas.innerHTML = "";

  // Percorrendo o array de tarefas do projeto atual
  for (let tarefa of projetoAtual.tarefas) {
    // Criando um elemento div para cada tarefa
    let divTarefa = document.createElement("div");
    divTarefa.className = "tarefa";
    divTarefa.id = tarefa.id;

    // Criando um elemento h3 para o título da tarefa
    let h3Tarefa = document.createElement("h3");
    h3Tarefa.textContent = tarefa.titulo;

    // Criando um elemento p para a prioridade da tarefa
    let pPrioridade = document.createElement("p");
    pPrioridade.textContent = "Prioridade: ";

    // Criando um elemento span para a cor da prioridade da tarefa
    let spanPrioridade = document.createElement("span");
    spanPrioridade.className = tarefa.prioridade;
    spanPrioridade.textContent = tarefa.prioridade;

    // Criando um elemento p para o status da tarefa
    let pStatus = document.createElement("p");
    pStatus.textContent = "Status: ";

    // Criando um elemento span para a cor do status da tarefa
    let spanStatus = document.createElement("span");
    spanStatus.className = tarefa.status;
    spanStatus.textContent = tarefa.status;

    // Criando um elemento button para editar a tarefa
    let buttonEditar = document.createElement("button");
    buttonEditar.textContent = "Editar Tarefa";
    buttonEditar.addEventListener("click", editarTarefa);

    // Criando um elemento button para excluir a tarefa
    let buttonExcluir = document.createElement("button");
    buttonExcluir.textContent = "Excluir Tarefa";
    buttonExcluir.addEventListener("click", excluirTarefa);

    // Adicionando os elementos ao div da tarefa
    divTarefa.appendChild(h3Tarefa);
    pPrioridade.appendChild(spanPrioridade);
    divTarefa.appendChild(pPrioridade);
    pStatus.appendChild(spanStatus);
    divTarefa.appendChild(pStatus);
    divTarefa.appendChild(buttonEditar);
    divTarefa.appendChild(buttonExcluir);

    // Adicionando o div da tarefa à lista de tarefas
    listaTarefas.appendChild(divTarefa);
  }
}

// função para adicionar uma nova tarefa ao projeto

function adicionarTarefa(event) {
  event.preventDefault();

  // verificar se os formulário estão preenchidos

  if (tituloTarefa.value && prioridadeTarefa.value && statusTarefa.value) {
    let novaTarefa = {
      id: gerarId(),
      titulo: tituloTarefa.value,
      prioridade: prioridadeTarefa.value,
      status: statusTarefa.value,
    };

    projetoAtual.tarefas.push(novaTarefa);

    salvarProjetos();

    mostrarTarefasProjeto();

    tituloTarefa.value = "";
    prioridadeTarefa.value = "";
    statusTarefa.value = "";
  } else {
    alert("preencha todos os campos do formulário");
  }
}

// função para  editar tarefa

function editarTarefa(event) {
  let divTarefa = event.target.parentElement;

  let tarefa = projetoAtual.tarefas.find(
    (tarefa) => tarefa.id === divTarefa.id
  );

  tituloTarefa.value = tarefa.titulo;

  prioridadeTarefa.value = tarefa.prioridade;

  statusTarefa.value = tarefa.status;

  // removendo o evento adicionar tarefa do botão do formulário

  botaoTarefa.removeEventListener("click", adicionarTarefa);

  // adicionando evento atualizar tarefa do botão do formulário

  botaoTarefa.addEventListener("click", atualizarTarefa);

  // alterar o texto do botão do fotmulário

  botaoTarefa.textContent = "Atualizar Tarefa";
}

// função para atulizar uma tarefa do projeto

function atualizarTarefa(event) {
  event.preventDefault();

  if (tituloTarefa.value && prioridadeTarefa.value && statusTarefa.value) {
    let tarefa = projetoAtual.tarefas.find(
      (tarefa) => tarefa.id === event.target.parentElement.id
    );

    // atualizar os dados da terefa

    tarefa.titulo = tituloTarefa.value;

    tarefa.prioridade = prioridadeTarefa.value;

    tarefa.status = statusTarefa.value;

    salvarProjetos();

    mostrarTarefasProjeto();

    tituloTarefa.value = "";

    prioridadeTarefa.value = "";

    statusTarefa.value = "";

    botaoTarefa.removeEventListener("click", atualizarTarefa);

    botaoTarefa.addEventListener("click", adicionarTarefa);

    botaoTarefa.textContent = "Adicionar Tarefa";
  } else {
    alert("preencha todos os campos do formulário");
  }
}

// função para excluir uma tarefa do projeto

function excluirTarefa(event) {
  let divTarefa = event.target.parentElement;

  // buscando o indice da tarefa pelo id

  let indice = projetoAtual.tarefas.findIndex(
    (tarefa) => tarefa.id === divTarefa.id
  );

  projetoAtual.tarefas.splice(indice, 1);

  salvarProjetos();

  mostrarTarefasProjeto();
}

// funçaõ para editar um projeto

function editarProjeto(event) {
  nomeProjeto.value = projetoAtual.nome;
  descricaoProjeto.value = projetoAtual.descricao;

  botaoProjeto.removeEventListener("click", criarProjeto);

  botaoProjeto.addEventListener("click", atualizarProjeto);

  botaoProjeto.textContent = "Atualizar Projeto";

  modal.style.display = "none";
}

// criando uma função para aatualizar um projeto

function atualizarProjeto(event) {
  if (nomeProjeto.value && descricaoProjeto.value) {
    projetoAtual.nome = nomeProjeto.value;
    projetoAtual.descricao = descricaoProjeto.value;

    salvarProjetos();

    mostrarProjetos();

    nomeProjeto.value = "";

    descricaoProjeto.value = "";

    botaoProjeto.removeEventListener("click", atualizarProjeto);

    botaoProjeto.addEventListener("click", criarProjeto);

    botaoProjeto.textContent = "Criar projeto";
  } else {
    alert("preencha todos os campos do formulário");
  }
}

// função para excluir projeto

function excluirProjeto(event) {
  let indice = projetos.findIndex((projeto) => projeto.id === projetoAtual.id);

  projetos.splice(indice, 1);

  salvarProjetos();

  mostrarProjetos();

  modal.style.display = "none";
}

// criando uma função para filtrar as tarefas de um projeto por
//  prioridade ou pelo status

function filtrarTarefas(event) {
  event.preventDefault();

  if (filtroTarefa.value) {
    listaTarefas.innerHTML = "";

    let tarefasFiltradas = projetoAtual.tarefas.filter(
      (tarefa) =>
        
        tarefa[filtrarTarefas.value] === event.target.previousElementSibling.value

    );

    // percorrendo o array de tarefas

    for (let tarefa of tarefasFiltradas) {
      let divTarefa = document.createElement("div");

      divTarefa.className = "tarefa";
      divTarefa.id = tarefa.id;

      let h3Tarefa = document.createElement("h3");
      h3Tarefa.textContent = tarefa.titulo;

      let pPrioridade = document.createElement("p");
      pPrioridade.textContent = "Prioride:";

      let spanPrioridade = document.createElement("span");
      spanPrioridade.className = tarefa.prioridade;
      spanPrioridade.textContent = tarefa.prioridade;

      let pStatus = document.createElement("p");
      pStatus.textContent = "Status:";

      let spanStatus = document.createElement("span");
      spanStatus.className = tarefa.status;
      spanStatus.textContent = tarefa.status;

      let buttonEditar = document.createElement("button");
      buttonEditar.textContent = "Editar Tarefa";
      buttonEditar.addEventListener("click", editarTarefa);

      let buttonExcluir = document.createElement("button");
      buttonExcluir.textContent = "Excluir Tarefa";
      buttonExcluir.addEventListener("click", excluirTarefa);

      // adicionar os elementos ao div da tarefa

      divTarefa.appendChild(h3Tarefa);

      pPrioridade.appendChild(spanPrioridade);

      divTarefa.appendChild(pPrioridade);

      pStatus.appendChild(spanStatus);

      divTarefa.appendChild(pStatus);

      divTarefa.appendChild(buttonEditar);

      divTarefa.appendChild(buttonExcluir);

      listaTarefas.appendChild(divTarefa);
    }
  } else {
    mostrarTarefasProjeto();
  }
}

// adicionar eventos aos elementos Dom

formProjeto.addEventListener("submit", criarProjeto);

botaoEditarProjeto.addEventListener("click", editarProjeto);

botaoExcluirProjeto.addEventListener("click", excluirProjeto);

formTarefa.addEventListener("submit", adicionarTarefa);

botaoFiltro.addEventListener("click", filtrarTarefas);

// carregando os projetos do localStorage ao carregar a página

document.addEventListener("DOMContentLoaded", carregarProjetos);


