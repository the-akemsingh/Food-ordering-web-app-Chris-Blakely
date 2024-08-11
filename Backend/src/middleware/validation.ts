import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateMyUserRequest = [
  body("name")
    .isString()
    .notEmpty()
    .withMessage("name is required and must be a string"),
  body("adrressLine1")
    .isString()
    .notEmpty()
    .withMessage("addressLine1 is required and must be a string"),
  body("city")
    .isString()
    .notEmpty()
    .withMessage("city is required and must be a string"),
  body("country")
    .isString()
    .notEmpty()
    .withMessage("country is required and must be a string"),
  handleValidationErrors,
];
