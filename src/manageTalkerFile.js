const fs = require('fs').promises;
const { join } = require('path');
const path = require('path');

const talkerFilePath = path.resolve(__dirname, 'talker.json');

const readTalkers = async () => {
  const talkerFile = await fs.readFile(talkerFilePath, 'utf-8');
  return JSON.parse(talkerFile);
};

const writeTalker = (talker) => {
  fs.writeFile(join(__dirname, 'talker.json'), talker);
};

const getTalkers = async () => {
  const talkers = await readTalkers();
  return talkers;
};

module.exports = { readTalkers, writeTalker, getTalkers };
