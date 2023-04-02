const Expense = require('../models/Expense');
const jwt = require('jsonwebtoken');

const getUserIdFromToken = (authorizationHeader) => {
  if (!authorizationHeader) {
    return null;
  }

  try {
    const token = authorizationHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userId;
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

exports.getAllExpenses = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req.headers.authorization);
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const expenses = await Expense.find({ user: userId });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching expenses' });
  }
};

exports.createExpense = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req.headers.authorization);
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const newExpense = new Expense({ ...req.body, user: userId });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    console.error('Error creating expense:', error);
    res.status(500).json({ message: 'Error creating expense' });
  }
};


exports.updateExpense = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req.headers.authorization);
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const updatedExpense = await Expense.findOneAndUpdate({ _id: req.params.id, user: userId }, req.body, { new: true });
    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: 'Error updating expense' });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req.headers.authorization);
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await Expense.findOneAndDelete({ _id: req.params.id, user: userId });
    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting expense' });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req.headers.authorization);
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const expenses = await Expense.find({ user: userId });
    const categories = [...new Set(expenses.map((expense) => expense.category))];
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories' });
  }
};
