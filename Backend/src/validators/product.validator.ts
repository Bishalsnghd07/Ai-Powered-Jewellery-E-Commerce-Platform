import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const schema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().positive().required(),
  images: Joi.array().items(Joi.string().uri()).min(1).required(),
  category: Joi.string().valid("rings", "necklaces", "earrings").required(),
});

export const validateProductInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
