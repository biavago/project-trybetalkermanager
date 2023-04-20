const express = require('express');
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
  if (!talker){
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  };
  return res.status(200).json(talker);
});
