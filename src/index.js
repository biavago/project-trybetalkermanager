const express = require('express');
const tokenGenerator = require('./tokenGenerator');
const { readTalkers, getTalkers, writeTalker } = require('./manageTalkerFile');
const { validateEmail } = require('./middlewares/validateEmail');
const { validatePassword } = require('./middlewares/validatePassword');
const { validateAge } = require('./middlewares/validateAge');
const { validateName } = require('./middlewares/validateName');
const { validateTalk, validateWatchedAt } = require('./middlewares/validateTalk');
const { validateRate } = require('./middlewares/validateRate');
const { validateToken } = require('./middlewares/validateToken');

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
//  4. Adicione as validações para o endpoint /login
app.post('/login', validateEmail, validatePassword, async (req, res) => {
  const login = ['email', 'password'];
  const loginValidation = login.every((field) => field in req.body);
  const token = tokenGenerator();

  if (loginValidation) {
    return res.status(200).json({ token });
  }
  return res.status(400).json({ message: 'É necessário preencher todos os campos!' });
});

//  5. Crie o endpoint POST /talker
app.post('/talker', 
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate, async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = await getTalkers();
  const id = talkers.length + 1;
  const newTalker = {
    age,
    id,
    name,
    talk,
  };
  const newTalkers = JSON.stringify([...talkers, newTalker]);
  await writeTalker(newTalkers);
  return res.status(201).json(newTalker);
});
