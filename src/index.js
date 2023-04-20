const express = require('express');
const tokenGenerator = require('./tokenGenerator');
const { readTalkers } = require('./readTalkerFile');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

//  1. Crie o endpoint GET /talker
app.get('/talker', async (req, res) => {
  const talkers = await readTalkers();
  if (!talkers) {
    return res.status(200).json([]);
  }
  return res.status(200).json(talkers);
});

// 2. Crie o endpoint GET /talker/:id
app.get('/talker/:id', async (req, res) => {
  const talkers = await readTalkers();
  const talker = talkers.find(({ id }) => id === Number(req.params.id));
  if (!talker) {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(talker);
});

//  3. Crie o endpoint POST /login
app.post('/login', async (req, res) => {
  const { body } = req.body;
  const login = ['email', 'password'];
  const loginValidation = login.every((field) => field in body);
  const token = tokenGenerator();

  if (loginValidation) {
    return res.status(200).json({ token });
  }
  return res.status(400).json({ message: 'E-mail ou Senha inválidos!' });
});
