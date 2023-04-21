const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  return next();
};

const validateWatchedAt = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  const watchedAtRegex = /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/.test(watchedAt);
  if (!watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!(watchedAtRegex)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  return next();
};

module.exports = { validateTalk, validateWatchedAt };
