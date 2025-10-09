const { conectarDb } = require("./database");


class Tarefa {
  constructor(nome, concluida) {
    this.nome = nome;         
    this.concluida = concluida;
    this.id = null;            
  }

  async inserir() {
    const db = await conectarDb();
    const collection = db.collection("tarefas");
    const resultado = await collection.insertOne({
      nome: this.nome,
      concluida: this.concluida,
    });
    this.id = resultado.insertedId; // (n)
  }

  async alterar() {
    const db = await conectarDb();
    const collection = db.collection("tarefas");
    await collection.updateOne(
      { _id: this.id },
      { $set: { nome: this.nome, concluida: this.concluida } }
    );
  }

  async deletar() {
    const db = await conectarDb();
    const collection = db.collection("tarefas");
    await collection.deleteOne({ nome: this.nome });
  }

  async buscar() {
    const db = await conectarDb();
    const collection = db.collection("tarefas");
    const resultado = await collection.findOne({ nome: this.nome });
    if (resultado) {
      this.id = resultado._id;
      this.nome = resultado.nome;
      this.concluida = resultado.concluida;
    }
  }
}

module.exports = Tarefa;
