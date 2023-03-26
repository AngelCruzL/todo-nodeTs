import { Task } from './tasks.entity';
import { Repository } from 'typeorm';

import { AppDataSource } from '../index';
import { instanceToPlain } from 'class-transformer';

export class TasksController {
  constructor(
    private readonly taskRepository: Repository<Task> = AppDataSource.getRepository(
      Task,
    ),
  ) {}

  public async getAll(): Promise<Task[]> {
    let allTasks: Task[] = [];

    // Fetch all tasks using the repository
    try {
      allTasks = await this.taskRepository.find({
        order: {
          date: 'ASC',
        },
      });

      // Convert the tasks instance to an array of objects
      allTasks = instanceToPlain(allTasks) as Task[];
    } catch (err) {
      console.log(err);
    }

    return allTasks;
  }
}
