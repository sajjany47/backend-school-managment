import { Response } from "express";

export const ErrorResponse = (error: any, res: Response) => {
  const statusCode = error.statusCode || error.status || 500; // fallback to 500
  let message = "";
  if (error.errors) {
    // Case 1: error.errors is an array
    if (Array.isArray(error.errors)) {
      message = error.errors.join(", ") || "Validation error occurred";
    }

    // Case 2: error.errors is an object (common in Zod/Mongoose validation errors)
    if (typeof error.errors === "object") {
      message = Object.values(error.errors)
        .map((err: any) => err?.message || String(err))
        .join(", ");
    }

    // Case 3: already a string
    if (typeof error.errors === "string") {
      message = error.errors;
    }
  } else if (error.message) {
    message = error.message;
  }

  message = "An unknown error occurred";

  return res.status(statusCode).json({ message: message });
};

export const ResponseTemplate = (data: any, res: Response) => {
  return res
    .status(200)
    .json({ message: "Data fetched successfully", data: data });
};
