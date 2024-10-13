const express = require('express');
const Todo = require('../models/Todo');
const router = express.Router();

// Get all todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Add a new todo
router.post('/', async (req, res) => {
  const { text, completed } = req.body;
  try {
      const newTodo = new Todo({ text, completed });
      await newTodo.save();
      res.status(201).json(newTodo);  // Respond with the created todo
  } catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(deletedTodo);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update a todo
router.patch('/:id', async (req, res) => {
    const { completed } = req.body;
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, { completed }, { new: true });
        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
