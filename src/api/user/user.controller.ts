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

export const UserUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reqData = req.body;

    const findExitingUser = await pool.query(
      `SELECT * from USERS WHERE id=$1`,
      [reqData.id]
    );
    if (findExitingUser.rows.length === 0) {
      return ErrorResponse(
        {
          message: "User with this id does not exists",
          statusCode: 404,
        },
        res
      );
    }
    let query = "";
    let values = [];
    if (findExitingUser.rows[0].role === "admin") {
      query = `UPDATE USERS SET name=$1,email=$2,mobilenumber=$3,country=$4,state=$5,city=$6,pincode=$7,address=$8,updated_at = CURRENT_TIMESTAMP WHERE id=$9 RETURNING *`;
      values = [
        reqData.name,
        reqData.email,
        reqData.mobilenumber,
        reqData.country,
        reqData.state,
        reqData.city,
        reqData.pincode,
        reqData.address,
        reqData.id,
      ];
    }
    if (findExitingUser.rows[0].role === "teacher") {
      query = `UPDATE USERS SET name=$1,email=$2,mobilenumber=$3,country=$4,state=$5,city=$6,pincode=$7,address=$8,updated_at = CURRENT_TIMESTAMP WHERE id=$9 RETURNING *`;
      values = [
        reqData.name,
        reqData.email,
        reqData.mobilenumber,
        reqData.country,
        reqData.state,
        reqData.city,
        reqData.pincode,
        reqData.address,
        reqData.id,
      ];
    }
  } catch (error) {
    ErrorResponse(error, res);
  }
};
