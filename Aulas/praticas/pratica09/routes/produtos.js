const express = require('express');
const router = express.Router();

let produtos = [];
let nextId = 1;

router.get('/', (req, res) => {
  res.json(produtos);
});

router.post('/', (req, res) => {
  const { nome, preco } = req.body;
  if (!nome || preco === undefined) {
    return res.status(422).json({ error: 'Nome e preço são obrigatórios' });
  }
  const produto = { id: String(nextId++), nome, preco };
  produtos.push(produto);
  res.status(201).json(produto);
});

router.get('/:produtoId', (req, res) => {
  const produto = produtos.find(p => p.id === req.params.produtoId);
  if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });
  res.json(produto);
});

router.put('/:produtoId', (req, res) => {
  const produto = produtos.find(p => p.id === req.params.produtoId);
  if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });
  const { nome, preco } = req.body;
  if (!nome || preco === undefined) return res.status(422).json({ error: 'Nome e preço são obrigatórios' });
  produto.nome = nome;
  produto.preco = preco;
  res.json(produto);
});

router.delete('/:produtoId', (req, res) => {
  const idx = produtos.findIndex(p => p.id === req.params.produtoId);
  if (idx === -1) return res.status(404).json({ error: 'Produto não encontrado' });
  produtos.splice(idx, 1);
  res.status(204).send();
});

module.exports = router;
