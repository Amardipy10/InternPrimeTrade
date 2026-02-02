import express from 'express';
import { getTasks, getTask, createTask, updateTask, deleteTask } from '../../controllers/taskController.js';
import { protect } from '../../middleware/auth.js';
import { createTaskValidation, updateTaskValidation, validate } from '../../middleware/validate.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getTasks)
  .post(createTaskValidation, validate, createTask);

router.route('/:id')
  .get(getTask)
  .put(updateTaskValidation, validate, updateTask)
  .delete(deleteTask);

export default router;
