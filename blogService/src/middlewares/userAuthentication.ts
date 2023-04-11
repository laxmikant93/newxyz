import express from "express";

import { verifyToken } from "../services/userAuthentication";

export const verifyUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    if (req.query.hash && req.query.token) {
      const tokenData = await verifyToken(req.query.hash as string, req.query.token as string);
      !tokenData.userId && res.sendStatus(401);
      req.body = { ...req.body, ...tokenData };
    } else res.sendStatus(401);
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(401);
  }
};