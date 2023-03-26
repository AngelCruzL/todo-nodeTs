import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { validationResult } from 'express-validator';

import { AppDataSource } from '../index';
import { Task } from './tasks.entity';

class TasksController {
  public async getAll(
    req: Request,
    res: Response,
  ): Promise<Response> {
    let allTasks: Task[] = [];

    // Fetch all tasks using the repository
    try {
      allTasks = await AppDataSource.getRepository(
        Task,
      ).find({
        order: {
          date: 'ASC',
        },
      });

      // Convert the tasks instance to an array of objects
      allTasks = instanceToPlain(allTasks) as Task[];

      return res.status(200).json(allTasks);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Something went wrong',
      });
    }
  }

  public async create(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ errors: errors.array() });
    }

    const { title, date, description, priority, status } =
      req.body;
    const newTask = new Task();
    newTask.title = title;
    newTask.date = date;
    newTask.description = description;
    newTask.priority = priority;
    newTask.status = status;

    let createdTask: Task;

    try {
      createdTask = await AppDataSource.getRepository(
        Task,
      ).save(newTask);

      // Convert the task instance to an object
      createdTask = instanceToPlain(createdTask) as Task;

      return res.status(201).json(createdTask);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Something went wrong',
      });
    }
  }
}

const tasksController = new TasksController();
export { tasksController };
