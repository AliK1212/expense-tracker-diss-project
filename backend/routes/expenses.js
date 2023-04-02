const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
require('dotenv').config();


router.get('/', expenseController.getAllExpenses);
router.post('/', expenseController.createExpense);
router.put('/:id', expenseController.updateExpense);
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;
