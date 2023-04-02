const Budget = require('../models/Budget');
const jwt = require('jsonwebtoken');

const getUserIdFromToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userId;
  } catch (error) {
    return null;
  }
};

exports.getBudget = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req.headers.authorization.split(' ')[1]);
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const budget = await Budget.find({ userId });
    res.status(200).json(budget);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching budget' });
  }
};

exports.createBudget = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req.headers.authorization.split(' ')[1]);
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const newBudget = new Budget({ ...req.body, userId });
    await newBudget.save();
    res.status(201).json(newBudget);
  } catch (error) {
    res.status(500).json({ message: 'Error creating budget' });
  }
};

exports.updateBudget = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req.headers.authorization.split(' ')[1]);
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const updatedBudget = await Budget.findOneAndUpdate({ _id: req.params.id, userId }, req.body, { new: true });
    res.status(200).json(updatedBudget);
  } catch (error) {
    res.status(500).json({ message: 'Error updating budget' });
  }
};

exports.deleteBudget = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req.headers.authorization.split(' ')[1]);
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await Budget.findOneAndDelete({ _id: req.params.id, userId });
    res.status(200).json({ message: 'Budget deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting budget' });
  }
};