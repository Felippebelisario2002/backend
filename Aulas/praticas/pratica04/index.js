const express = require("express");
const app = express();

const tarefas = [
  { id: 1, nome: "Estudar middleware", concluida: false },
  { id: 2, nome: "Praticar Express", concluida: true }
];

app.use(express.json());

app.use((req, res, next) => {
  const agora = new Date();
  console.log(`[${agora.toISOString()}] ${req.method} ${req.url}`);
  next();
});

const tarefasRouter = express.Router();

tarefasRouter.get("/", (req, res) => {
  res.json(tarefas);
});

tarefasRouter.post("/", (req, res) => {
  const { nome, concluida } = req.body;
  const novaTarefa = {
    id: tarefas.length ? tarefas[tarefas.length - 1].id + 1 : 1,
    nome,
    concluida: concluida || false
  };
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

tarefasRouter.get("/:tarefaId", (req, res, next) => {
  const tarefaId = parseInt(req.params.tarefaId);
  const tarefa = tarefas.find(t => t.id === tarefaId);
  if (!tarefa) return next(new Error("Tarefa não localizada"));
  res.json(tarefa);
});

tarefasRouter.put("/:tarefaId", (req, res, next) => {
  const tarefaId = parseInt(req.params.tarefaId);
  const tarefa = tarefas.find(t => t.id === tarefaId);
  if (!tarefa) return next(new Error("Tarefa não localizada"));

  const { nome, concluida } = req.body;
  tarefa.nome = nome !== undefined ? nome : tarefa.nome;
  tarefa.concluida = concluida !== undefined ? concluida : tarefa.concluida;
  res.json(tarefa);
});

tarefasRouter.delete("/:tarefaId", (req, res, next) => {
  const tarefaId = parseInt(req.params.tarefaId);
  const index = tarefas.findIndex(t => t.id === tarefaId);
  if (index === -1) return next(new Error("Tarefa não localizada"));

  tarefas.splice(index, 1);
  res.status(204).send();
});

app.use("/tarefas", tarefasRouter);


app.use((err, req, res, next) => {
  res.status(400).json({ erro: err.message });
});

app.listen(3000, () => {
  console.log("Servidor online em http://localhost:3000");
});

module.exports = app;
