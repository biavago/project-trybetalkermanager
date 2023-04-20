const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(email);
  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (emailRegex) {
    return next();
  }
  return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
};

module.exports = { validateEmail };
