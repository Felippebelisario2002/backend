const Tarefa = require("./modelo");

async function adicionarTarefa(nome) {
  const tarefa = new Tarefa(nome);
  await tarefa.inserir();
}

async function buscarTarefa(nome) {
  const tarefa = new Tarefa(nome);
  return await tarefa.buscar();
}

async function atualizarTarefa(nome, concluida) {
  const tarefa = new Tarefa(nome);
  const encontrada = await tarefa.buscar();

  if (encontrada) {
    tarefa.nome = nome;
    tarefa.concluida = concluida;
    await tarefa.alterar();
  } else {
    console.log("Tarefa não encontrada.");
  }
}

async function removerTarefa(nome) {
  const tarefa = new Tarefa(nome);
  const encontrada = await tarefa.buscar();

  if (encontrada) {
    await tarefa.deletar();
  } else {
    console.log("Tarefa não encontrada.");
  }
}

module.exports = {
  adicionarTarefa,
  buscarTarefa,
  atualizarTarefa,
  removerTarefa
};
