import express from "express";
const { clearHash } = require('../services/cache');

module.exports = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  await next();
  if (req.body.userId) clearHash(req.body.userId);
};