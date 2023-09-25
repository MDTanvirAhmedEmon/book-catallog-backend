import { User } from '@prisma/client';

import sendResponse from '../../../shared/sendResponse';
import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { authServices } from './auth.services';
import { IUserLoginResponse } from './auth.interface';
import config from '../../../config';


const createUser = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;

    const result = await authServices.createUser(data);

    sendResponse<User>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user created successfully',
      data: result,
    });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;

    const result = await authServices.loginUser(data);
      const { refreshToken, accessToken } = result;
      console.log(accessToken)

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

    sendResponse<IUserLoginResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user login successfully',
      token: accessToken,
    });
});

export const authController = {
    createUser,
    loginUser,
};