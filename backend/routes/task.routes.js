const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const { validateTask } = require('../validators/task.validator');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/', taskController.getAllTasks);
router.post('/', authMiddleware, validateTask, taskController.createTask);
router.put('/:id', authMiddleware, validateTask, taskController.updateTask);
router.delete('/:id', authMiddleware, taskController.deleteTask);

module.exports = router;
