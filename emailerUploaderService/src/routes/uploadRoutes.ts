import { Application } from "express";
import UploadController from "../controllers/uploadController";

import { errorResponse, successResponse } from "../services/apiResponse";

module.exports = (app: Application) => {
  app.post('/cloud/signedUrl', async (req, res, next) => {
    try {
      const userId = req.query.userId || '';
      const data = req.body || '';
      console.log(data);
      const controller = new UploadController();
      const response: any = await controller.getSignedUrl(userId, data);
      res
        .status(200)
        .json(successResponse('upload response', response, res.statusCode));
    } catch (error) {
      console.log("error in upload", error);
      res
        .status(500)
        .json(errorResponse("error in upload", res.statusCode));
    }

  });
}