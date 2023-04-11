import { Application } from "express";

import { errorResponse, successResponse } from "../services/apiResponse";
import PemKeys from "../controllers/PemKeys";
import { encrypt, decrypt } from "../middlewares/DataEncryptionAndDecryption";
import TokenCreation from "../controllers/TokenCreation";

module.exports = (app: Application) => {

  app.post("/auth/createtoken", encrypt, async (req, res) => {
    try {
      const body = req.body;
      const controller = new TokenCreation();
      const response = await controller.createToken(body);
      res.send(response);
    } catch (error) {
      console.log(error);
    }

  });

  app.post("/auth/verifytoken", decrypt, async (req, res) => {
    try {
      const body = req.body;
      const controller = new TokenCreation();
      const response = await controller.verifyToken(body);
      res.send(response);
    } catch (error) {
      console.log(error);
    }
  });

  app.get('/auth/generatepemkey', async (req, res, next) => {
    try {
      const controller = new PemKeys();
      const response = await controller.generatePemKey();
      res
        .status(200)
        .json(successResponse('pem response', response, res.statusCode));
    } catch (error) {
      console.log("error in creating pem keys", error);
    }
  });
}