const fs = require('fs').promises;

const readTalkers = async () => {
  const talkerFile = await fs.readFile('./talker.json', 'utf-8');
  return JSON.parse(talkerFile);
};

module.exports = { readTalkers };
