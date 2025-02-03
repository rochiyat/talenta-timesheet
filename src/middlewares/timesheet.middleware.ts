import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const timesheetMiddleware = {
  validateCookie: (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object().keys({
      cookie: Joi.string().required(),
    });
    const { error } = schema.validate(req.headers);
    if (error) {
      return next(error);
    }
    next();
  },

  validateDate: (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object().keys({
      date: Joi.string().required(),
    });
    const { error } = schema.validate(req.params);
    if (error) {
      return next(error);
    }
    next();
  },
};

export default timesheetMiddleware;
