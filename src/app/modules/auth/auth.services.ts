import { PrismaClient,User } from "@prisma/client";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { IUserLogin, IUserLoginResponse } from "./auth.interface";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import { jwtHelpers } from "../../../helpers/jwtHelpers";


const prisma = new PrismaClient();

const createUser = async(data: User): Promise<User> => {

    const isExist = await prisma.user.findFirst({
        where: {
            email: data.email
        }
    });
    if(isExist){
        throw new ApiError(httpStatus.BAD_REQUEST, 'This Email Already In Use');
    }
    const result = await prisma.user.create({
        data
    });

    return result;
};


const loginUser = async (payload: IUserLogin ): Promise<IUserLoginResponse> => {
    const { email, password } = payload;

    const isUserExist = await prisma.user.findFirst({
        where: {
            email
        }
    });

    if (!isUserExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
    }
  
    // password is not matched error send
    if(password !== isUserExist.password) {
        throw new ApiError(httpStatus.FORBIDDEN, 'incorrect password');
    }


    //create access token & refresh token
    const { id: userId, role } = isUserExist;
    const accessToken = jwtHelpers.createToken(
      { role, userId  },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );
  
    const refreshToken = jwtHelpers.createToken(
      { role, userId },
      config.jwt.refresh_secret as Secret,
      config.jwt.refresh_expires_in as string
    );
  
    return {
      accessToken,
      refreshToken,
    };
  };


export const authServices = {
    createUser,
    loginUser,
};