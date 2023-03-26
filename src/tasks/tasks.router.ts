import { Request, Response, Router } from 'express';
import { validationResult } from 'express-validator';

import { TasksController } from './tasks.controller';
import { createValidator } from './tasks.validator';

export const tasksRouter: Router = Router();

tasksRouter.get(
  '/tasks',
  async (req: Request, res: Response) => {
    const taskController = new TasksController();
    const allTasks = await taskController.getAll();

    res.status(200).json(allTasks);
  },
);

tasksRouter.post(
  '/tasks',
  createValidator,
  //@ts-ignore
  async (req: Request, res: Response) => {
    console.log(req.body);
    const errors = validationResult(req);
    // console.log(errors);

    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ errors: errors.array() });
    }
  },
);
