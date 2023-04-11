import { Application } from "express";

import { errorResponse, successResponse } from "../services/apiResponse";
import BlogController from "../controllers/blogController";
import { verifyUser } from "../middlewares/userAuthentication";
const cleanCache = require('../middlewares/cleanCache');

module.exports = (app: Application) => {
  app.post('/blog/create-blog', verifyUser, cleanCache, async (req, res, next) => {
    try {
      const user = req.body.userId || '' as string;
      const title: string = req.body.title || '' as string;
      const content: string = req.body.content || '' as string;
      const controller = new BlogController();
      const response: any = await controller.createBlog(user, title, content);
      res
        .status(200)
        .json(successResponse('blog response', response, res.statusCode));
    } catch (error) {
      console.log("error in creating blog", error);
      res
        .status(500)
        .json(errorResponse("error in creating blog", res.statusCode));
    }

  });
  app.get('/blog/blog-detail', verifyUser, async (req, res, next) => {
    try {
      const user = req.body.userId || '' as string;
      const blog: any = req.query.blog || '' as string;
      const controller = new BlogController();
      const response: any = await controller.getBlog(blog, user);
      res
        .status(200)
        .json(successResponse('blog response', response, res.statusCode));
    } catch (error) {
      console.log("error in blog detail", error);
      res
        .status(500)
        .json(errorResponse("error in blog detail", res.statusCode));
    }
  });
  app.get('/blog/private-blogs', verifyUser, async (req, res, next) => {
    try {
      const user: any = req.body.userId || '' as string;
      const controller = new BlogController();
      const response: any = await controller.privateBlogs(user);
      res
        .status(200)
        .json(successResponse('blog response', response, res.statusCode));
    } catch (error) {
      console.log("error in blog list", error);
      res
        .status(500)
        .json(errorResponse("error in blog list", res.statusCode));
    }
  });
  app.get('/blog/blog-list', verifyUser, async (req, res, next) => {
    try {
      const user = req.body.userId || '' as string;
      const controller = new BlogController();
      const response: any = await controller.blogList(user);
      res
        .status(200)
        .json(successResponse('blog response', response, res.statusCode));
    } catch (error) {
      console.log("error in blog list", error);
      res
        .status(500)
        .json(errorResponse("error in blog list", res.statusCode));
    }
  });
  app.patch('/blog/update-blog', verifyUser, cleanCache, async (req, res, next) => {
    try {
      const blog = req.body;
      const controller = new BlogController();
      const response: any = await controller.updateBlog(blog);
      res
        .status(200)
        .json(successResponse('blog response', response, res.statusCode));
    } catch (error) {
      console.log("error in blog list", error);
      res
        .status(500)
        .json(errorResponse("error in blog list", res.statusCode));
    }
  });
  app.delete('/blog/delete-blog', verifyUser, cleanCache, async (req, res, next) => {
    try {
      const blog: any = req.query.blog as string;
      const controller = new BlogController();
      const response: any = await controller.deleteBlog(blog);
      res
        .status(200)
        .json(successResponse('blog response', response, res.statusCode));
    } catch (error) {
      console.log("error in blog list", error);
      res
        .status(500)
        .json(errorResponse("error in blog list", res.statusCode));
    }
  });
}