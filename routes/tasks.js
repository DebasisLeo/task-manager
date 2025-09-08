const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTaskById,
  filterTasks
} = require('../controllers/taskController');


router.post('/', createTask);
router.get('/', getTasks);
router.get('/filter', filterTasks); 
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
