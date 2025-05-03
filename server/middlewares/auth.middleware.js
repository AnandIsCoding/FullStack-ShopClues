import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import chalk from "chalk";

// Auth
export const isAuthenticatedUser = async (req, res, next) => {
  try {
    //extract token
    const userToken =
      req.cookies?.userToken ||
      req.body?.userToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    // if token not available
    if (!userToken)
      return res.status(401).json({
        success: false,

        message: "Unauthorized, userToken not found !!",
        error: "userToken not found",
      });
    //verify userToken
    try {
      const decodedData = await jwt.verify(userToken, process.env.SECRET_KEY);
      const { _id, accountType } = decodedData;
      req.user = { userId: _id, accountType };

    } catch (error) {
      console.log(
        "Error in decodingjwt in authenticationMiddleware ----> ",
        error.message
      );
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
        error: "Unauthorized access",
      });
    }

    next();
  } catch (error) {
    console.log(
      chalk.bgRedBright(
        "Error in authenticationMiddleware function in auth.middleware.js --->> ",
        error.message
      )
    );
    return res.status(503).json({
      success: false,
      message: "Internal Server Error",
      error: "Internal Server Error",
    });
  }
};

// isAdmin

export const isAdmin = async (req, res, next) => {
  try {
    const { userId, accountType } = req.user;
    if (accountType !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized to access Admin routes",
        error: "Unauthorized to access Admin routes",
      });
    }
    next();
  } catch (error) {
    console.log(
      chalk.bgRedBright(
        "Error in isAdminMiddleware function in auth.middleware.js --->> ",
        error.message
      )
    );
    return res.status(503).json({
      success: false,
      message: "Internal Server Error, Can't find accountType",
      error: "Internal Server Error",
    });
  }
};
