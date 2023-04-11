import { Application } from "express";

import AuthController from "../controllers/authController";
import { errorResponse, successResponse } from "../services/apiResponse";
import { IUser } from "../models/User";

module.exports = (app: Application) => {
  app.post('/auth/login', async (req, res, next) => {
    try {
      const email: string = req.body.email || '';
      const password: string = req.body.password || '';
      const controller = new AuthController();
      const response: any = await controller.emailLogin(email, password);
      res
        .status(200)
        .json(successResponse('login response', response, res.statusCode));
    } catch (error) {
      console.log("error in login", error);
      res
        .status(500)
        .json(errorResponse("error in login", res.statusCode));
    }

  });
  app.post('/auth/signup', async (req, res, next) => {
    try {
      const body = req.body as Pick<IUser, "email" | "userName" | "password">;
      const controller = new AuthController();
      const response: any = await controller.emailSignup(body.email, body.userName, body.password);
      res
        .status(200)
        .json(successResponse('signup response', response, res.statusCode));
    } catch (error) {
      console.log("error in signup", error);
      res
        .status(500)
        .json(errorResponse("error in signup", res.statusCode));
    }

  });
  app.get('/auth/logout', async (req, res, next) => {
    try {
      const hash: any = req.query.hash || '';
      const token: any = req.query.token || '';
      const controller = new AuthController();
      const response: any = await controller.logout(hash, token);
      res
        .status(200)
        .json(successResponse('user logged out successfully', response, res.statusCode));
    } catch (error) {
      console.log("error in signup", error);
      res
        .status(500)
        .json(errorResponse("error in logout", res.statusCode));
    }
  });
  app.patch('/auth/resetpassword', async (req, res, next) => {
    try {
      const hash: any = req.body.hash || '';
      const token: any = req.body.token || '';
      const oldPassword: any = req.body.oldPassword || '';
      const newPassword: any = req.body.newPassword || '';
      const controller = new AuthController();
      const response: any = await controller.resetpassword(hash, token, oldPassword, newPassword);
      res
        .status(200)
        .json(successResponse('user password updated successfully', response, res.statusCode));
    } catch (error) {
      console.log("error in password updation", error);
      res
        .status(500)
        .json(errorResponse("error in password updation", res.statusCode));
    }
  });
}