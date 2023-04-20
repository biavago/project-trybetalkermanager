const fs = require('fs').promises;
const path = require('path');

const talkerFilePath = path.resolve(__dirname, 'talker.json');

const readTalkers = async () => {
  const talkerFile = await fs.readFile(talkerFilePath, 'utf-8');
  return JSON.parse(talkerFile);
};

module.exports = { readTalkers };
