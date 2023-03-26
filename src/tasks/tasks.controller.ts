import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';

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
}

const tasksController = new TasksController();
export { tasksController };
