const Tarefa = require("./modelo");

async function main() {
  const tarefa = new Tarefa("Estudar Node.js", false);
  await tarefa.inserir();
  console.log("✅ Tarefa inserida com ID:", tarefa.id);

  await tarefa.buscar();
  console.log("🔍 Tarefa encontrada:", tarefa);

  tarefa.concluida = true;
  await tarefa.alterar();
  console.log("✏️ Tarefa atualizada.");

  await tarefa.deletar();
  console.log("🗑️ Tarefa deletada.");
}

main();
