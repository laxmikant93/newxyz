import Blog from "../models/Blog";

export default class AuthController {
  public async createBlog(user: string, title: string, content: string) {
    try {
      let resp: any = {};
      if (user && title && content) {
        resp = await Blog.create({ user, title, content });
      }
      return resp;
    } catch (error) {
      return error;
    }
  };

  public async getBlog(blog: string, user: string) {
    try {
      let resp: any = {};
      if (blog) {
        resp = await Blog
          .findOne({ _id: blog, isDeleted: false })
          .cache({ key: user });
      }
      return resp;
    } catch (error) {
      return error;
    }
  };

  public async privateBlogs(user: string) {
    try {
      let resp: any = {};
      if (user) {
        resp = await Blog
          .find({ user: user, isDeleted: false })
          .cache({ key: user });
      }
      return resp;
    } catch (error) {
      return error;
    }
  };

  public async blogList(user: string) {
    try {
      let resp: any = {};
      resp = await Blog
        .find({ isDeleted: false })
        .cache({ key: user });
      return resp;
    } catch (error) {
      return error;
    }
  };

  public async updateBlog(blog: any) {
    try {
      let resp: any = {};
      if (blog && blog._id) {
        resp = await Blog.findByIdAndUpdate(
          blog._id,
          { ...blog },
          { new: true }
        );
      }
      return resp;
    } catch (error) {
      return error;
    }
  };

  public async deleteBlog(blog: string) {
    try {
      let resp: any = {};
      if (blog) {
        resp = await Blog.findByIdAndUpdate(
          blog,
          { isDeleted: true },
          { new: true }
        );
      }
      return resp;
    } catch (error) {
      return error;
    }
  };
}