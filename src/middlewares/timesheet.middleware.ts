import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const timesheetMiddleware = {
  validateCookie: (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object().keys({
      cookie: Joi.string().required(),
    });
    const { error } = schema.validate({ ...req.headers });
    if (error) {
      return next(error);
    }
    next();
  },

  validateDate: (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object().keys({
      date: Joi.string().required(),
    });
    const { error } = schema.validate({ ...req.params });
    if (error) {
      return next(error);
    }
    next();
  },

  validateRangeDate: (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object().keys({
      startDate: Joi.string().required(),
      endDate: Joi.string().required(),
    });
    const { error } = schema.validate({ ...req.params });
    if (error) {
      return next(error);
    }
    next();
  },

  validateCheckTimesheet: (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object().keys({
      year: Joi.string().required(),
      month: Joi.string().required(),
    });
    const { error } = schema.validate({ ...req.params });
    if (error) {
      return next(error);
    }
    next();
  },

  validateInputTimesheet: (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object().keys({
      taskId: Joi.number().required(),
      activity: Joi.string().required(),
      startDate: Joi.string().required(),
      endDate: Joi.string().required(),
    });
    const { error } = schema.validate({ ...req.body });
    if (error) {
      return next(error);
    }
    next();
  },
};

export default timesheetMiddleware;
