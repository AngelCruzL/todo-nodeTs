import { body, ValidationChain } from 'express-validator';

import { Priority } from '../enums/Priority';
import { Status } from '../enums/Status';

export const createValidator: ValidationChain[] = [
  body('title')
    .not()
    .isEmpty()
    .withMessage('Title is required')
    .trim()
    .isString()
    .withMessage('Title must be a string'),

  body('date')
    .not()
    .isEmpty()
    .withMessage('Date is required')
    .isString()
    .withMessage('Date must be a string'),

  body('description')
    .trim()
    .isString()
    .withMessage('Description must be a text'),

  body('priority')
    .trim()
    .isIn([Priority.low, Priority.normal, Priority.high])
    .withMessage(
      'Priority can only be Low, Normal or High',
    ),

  body('status')
    .trim()
    .isIn([
      Status.todo,
      Status.inProgress,
      Status.completed,
    ])
    .withMessage(
      'Status can only be Todo, In Progress or Completed',
    ),
];
