import mongoose from "mongoose";
import nconf from 'nconf';

import { compareHash, createToken, generateHash, verifyToken } from "../utils/dataEncDecrypt";
// const User = mongoose.model("User");
import User, { IUser } from "../models/User";
import { IToken } from '../models/Interfaces';

export default class AuthController {

  private async connectToNewDb() {
    mongoose.connect(nconf.get('db1'), function () {
      console.log('Connected to new db')
      process.exit()
    })
  }

  private async createUserToken(user: any) {
    const date = new Date();
    let token: any = await createToken({ userId: user._id.toString(), email: user.email });
    user = await User.findOneAndUpdate(
      { _id: user._id },
      { token: token.token, hash: token.hash },
      { new: true }
    ).lean();
    return { user };
  }

  private getUser = async (email: string) => {
    try {
      let user = await User.findOne({ email: email, isDeleted: false });
      if (user && user._id) {
        return user;
      } else {
        return "User not found";
      }
    } catch (error) {
      return error;
    }
  };

  public async emailLogin(email: string, password: string) {
    try {
      if (email && password) {
        const user: any = await this.getUser(email);
        if (user === "User not found") {
          return user;
        } else {
          if (compareHash(user.password, password)) {
            const userData: any = await this.createUserToken(user);
            return { email: userData.user.email, userName: userData.user.userName, hash: userData.user.hash, token: userData.user.token };
          } else {
            return "Incorrect Password";
          }
        }
      }
      else return `credentials not provided.`
    } catch (error) {
      return error;
    }
  }

  public async emailSignup(email: string, userName: string, password: string) {
    try {
      if (email && password && userName) {
        let user: any = await this.getUser(email);
        if (user === "User not found") {
          const hwPassword = generateHash(password);
          user = await User.create({
            email: email,
            userName: userName,
            password: hwPassword
          });
          const userData: any = await this.createUserToken(user);
          return { email: userData.user.email, userName: userData.user.userName, hash: userData.user.hash, token: userData.user.token };
        }
        else return 'user already exists';
      }
      else return `complete user details not provided.`
    } catch (error) {
      return error;
    }
  }

  public async logout(hash: string, token: string) {
    try {
      if (hash && token) {
        const user = await verifyToken({ hash, token });
        if (user.result && user.decryptedData?.userId) {
          const userLogout = await User.findByIdAndUpdate(
            user.decryptedData?.userId,
            { token: "", hash: "" }
          );
          return "user logged out successfully";
        }
        return "user not logged out";
      }
      else return "user not found";
    } catch (error) {
      return error;
    }
  }

  public async resetpassword(hash: string, token: string, oldPassword: string, newPassword: string) {
    try {
      if (hash && token && oldPassword && newPassword) {
        const user = await verifyToken({ hash, token });

        if (user.result && user.decryptedData?.userId) {
          const userData: any = await User.findById(user.decryptedData?.userId);
          if (userData?.password && compareHash(userData.password, oldPassword)) {
            const hwPassword = generateHash(newPassword);
            await User.findByIdAndUpdate(
              user.decryptedData?.userId,
              { password: hwPassword }
            );
            return "user password updated successfully";
          }
          return "password not updated";
        }
        return "password not updated";
      }
      else return "proper data not found";
    } catch (error) {
      return error;
    }
  }
}