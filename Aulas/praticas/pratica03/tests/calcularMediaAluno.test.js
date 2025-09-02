const { calcularMediaAluno } = require('../src/calcularMediaAluno');

test('a função calcularMediaAluno deve estar definida', () => {
  expect(calcularMediaAluno).toBeDefined();
});

test('lança erro se a1 ou a2 não forem informadas', () => {
  expect(() => calcularMediaAluno()).toThrow('Notas a1 ou a2 não informadas');
  expect(() => calcularMediaAluno(5)).toThrow('Notas a1 ou a2 não informadas');
});

test('lança erro se a1 ou a2 forem negativas', () => {
  expect(() => calcularMediaAluno(-1, 5)).toThrow('Notas a1 ou a2 não podem ser negativas');
  expect(() => calcularMediaAluno(5, -2)).toThrow('Notas a1 ou a2 não podem ser negativas');
});

test('calcula média base quando a3 não é informada', () => {
  expect(calcularMediaAluno(6, 8)).toBeCloseTo(6 * 0.4 + 8 * 0.6);
});

test('lança erro se a3 for negativa', () => {
  expect(() => calcularMediaAluno(6, 8, -5)).toThrow('Nota a3 não pode ser negativa');
});

test('melhor média usando a1 e a3', () => {
  expect(calcularMediaAluno(6, 8, 9)).toBeCloseTo(Math.max(6*0.4 + 9*0.6, 9*0.4 + 8*0.6));
});

test('melhor média usando a3 e a2', () => {
  expect(calcularMediaAluno(6, 7, 8)).toBeCloseTo(Math.max(6*0.4 + 8*0.6, 8*0.4 + 7*0.6));
});
