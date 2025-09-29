import { NextFunction, Request, Response } from "express";
import { ErrorResponse, ResponseTemplate } from "../../utilis";
import { UserSignUpSchema } from "./user.validation";
import pool from "../../db";

export const UserSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = await UserSignUpSchema.validate(req.body, {
      abortEarly: false,
    });

    const {
      name,
      username,
      email,
      mobilenumber,
      country,
      state,
      city,
      pincode,
      address,
      role,
    } = validatedData;
    const findExitingUser = await pool.query(
      `SELECT * from USERS WHERE username=$1`,
      [username]
    );

    if (findExitingUser.rows.length > 0) {
      return ErrorResponse(
        {
          message: "User with this username already exists",
          statusCode: 400,
        },
        res
      );
    }
    const result = await pool.query(
      `INSERT INTO USERS (name, username, email, mobilenumber, country, state, city, pincode, address, role)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [
        name,
        username,
        email,
        mobilenumber,
        country,
        state,
        city,
        pincode,
        address,
        role,
      ]
    );

    ResponseTemplate(result.rows[0], res);
  } catch (error) {
    ErrorResponse(error, res);
  }
};
