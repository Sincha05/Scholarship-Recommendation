const validateScholarship = (req, res, next) => {
  const { title, description, deadline, amount } = req.body;
  
  if (!title || !description || !deadline || !amount) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  if (isNaN(amount)) {
    return res.status(400).json({ error: 'Amount must be a number' });
  }
  
  next();
};

module.exports = { validateScholarship };