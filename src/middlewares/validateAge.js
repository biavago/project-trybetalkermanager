const validateAge = (req, res, next) => {
  const { age } = req.body;
  const type = typeof age === 'number';
  const isInteger = Number.isInteger(age);

  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (!type || !isInteger || age < 18) {
    return res.status(400).json({ 
      message: 'O campo "age" deve ser um número inteiro igual ou maior que 18',
    });
  }
  return next();
  };

module.exports = { validateAge };
